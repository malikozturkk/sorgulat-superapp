"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import { getRequest } from "@/utils/api";
import { FiArrowRight, FiArrowLeft, FiCheck, FiX, FiSettings, FiInfo } from "react-icons/fi";
import Link from "next/link";
import { reverseTranslate, translate, turkishSort } from "@/utils/utils";
import { PaginationInfo, University, UserPreferences } from "../types";

export default function UniversityMatch() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [preferences, setPreferences] = useState<UserPreferences>({
        selectedCities: [],
        selectedUniversityTypes: [],
        selectedDepartments: [],
        selectedLanguages: [],
        selectedDegreeLevels: [],
        educationType: [],
        selectedUniversities: [],
        sortBy: "score",
        sortOrder: "desc",
        selectAllFlags: {
            cities: false,
            departments: false,
            universityTypes: false,
            degreeLevels: false,
            languages: false,
            educationType: false,
            universities: false
        }
    });
    const [filteredResults, setFilteredResults] = useState<University[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
        limit: 5
    });
    const [showAllSelected, setShowAllSelected] = useState(false);
    const [isSelectingAll, setIsSelectingAll] = useState(false);
    const [selectAllProgress, setSelectAllProgress] = useState(0);
    const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);
    const [displayCount, setDisplayCount] = useState(50);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const optionsContainerRef = useRef<HTMLDivElement>(null);
    const [allOptions, setAllOptions] = useState<{
        cities: string[];
        departments: string[];
        universityTypes: string[];
        degreeLevels: string[];
        languages: string[];
        educationTypes: string[];
        universities: string[];
    }>({
        cities: [],
        departments: [],
        universityTypes: [],
        degreeLevels: [],
        languages: [],
        educationTypes: [],
        universities: []
    });
    const [questions, setQuestions] = useState([
        {
            id: "cities",
            title: "Hangi şehirlerde okumak istiyorsunuz?",
            subtitle: "Birden fazla şehir seçebilirsiniz",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "departments",
            title: "Hangi bölümlerde okumak istiyorsunuz?",
            subtitle: "İlgilendiğiniz bölümleri seçin",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "universityTypes",
            title: "Hangi üniversite türlerini tercih edersiniz?",
            subtitle: "Üniversite türünü seçin",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "degreeLevels",
            title: "Hangi eğitim seviyesini tercih edersiniz?",
            subtitle: "Eğitim süresini seçin",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "languages",
            title: "Hangi dillerde eğitim almak istiyorsunuz?",
            subtitle: "Eğitim dilini seçin",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "educationType",
            title: "Hangi eğitim türlerini tercih edersiniz?",
            subtitle: "Eğitim türünü seçin",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "universities",
            title: "Hangi üniversiteleri tercih edersiniz?",
            subtitle: "Birden fazla üniversite seçebilirsiniz",
            type: "multiSelect",
            options: [] as string[],
            required: false
        },
        {
            id: "scoreRange",
            title: "Puan aralığınız nedir?",
            subtitle: "Minimum ve maksimum puanınızı belirtin",
            type: "range",
            required: false
        },
        {
            id: "rankRange",
            title: "Sıralama aralığınız nedir?",
            subtitle: "Minimum ve maksimum sıralamanızı belirtin",
            type: "range",
            required: false
        }
    ]);

    const scrollToTop = useRef<HTMLDivElement>(null);
    const selectAllTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const smoothScrollToTop = () => {
        if (scrollToTop.current) {
            scrollToTop.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    useEffect(() => {
        if (universities.length > 0) {
            updateQuestionOptions();
        }
    }, [universities, preferences]);

    useEffect(() => {
        setSearchTerm(""); 
    }, [currentStep]);

    useEffect(() => {
        const filteredOptions = getFilteredOptions(questions[currentStep]?.options || []);
        const end = Math.min(displayCount, filteredOptions.length);
        setDisplayedOptions(filteredOptions.slice(0, end));
    }, [currentStep, searchTerm, displayCount, questions]);

    useEffect(() => {
        return () => {
            if (selectAllTimeoutRef.current) {
                clearTimeout(selectAllTimeoutRef.current);
            }
        };
    }, []);

    const fetchUniversities = async () => {
        try {
            const data = await getRequest("/schools/universities");
            setUniversities(data);
            setLoading(false);
        } catch (error) {
            console.error("Üniversite verileri alınamadı:", error);
            setLoading(false);
        }
    };

    const updateQuestionOptions = () => {
        const cities = [...new Set(universities.map(uni => uni.city))].sort(turkishSort);
        
        let cityFilteredUniversities = universities;
        if (preferences.selectedCities.length > 0) {
            cityFilteredUniversities = cityFilteredUniversities.filter(uni => 
                preferences.selectedCities.includes(uni.city)
            );
        }
        
        const departments = [...new Set(cityFilteredUniversities
            .flatMap(uni => uni.departments.map(dept => dept.name))
        )].sort(turkishSort);
        
        let departmentFilteredUniversities = cityFilteredUniversities;
        if (preferences.selectedDepartments.length > 0) {
            departmentFilteredUniversities = departmentFilteredUniversities.map(uni => ({
                ...uni,
                departments: uni.departments.filter(dept => 
                    preferences.selectedDepartments.includes(dept.name)
                )
            })).filter(uni => uni.departments.length > 0);
        }

        const universityTypes = [...new Set(departmentFilteredUniversities
            .map(uni => translate.universityType(uni.university_type))
        )].sort(turkishSort);
        
        let universityTypeFilteredUniversities = departmentFilteredUniversities;
        if (preferences.selectedUniversityTypes.length > 0) {
            const selectedTypes = preferences.selectedUniversityTypes.map(turkishType => 
                reverseTranslate.universityType(turkishType)
            );
            universityTypeFilteredUniversities = universityTypeFilteredUniversities.filter(uni => 
                selectedTypes.includes(uni.university_type)
            );
        }
        
        let degreeLevels: string[] = [...new Set(universityTypeFilteredUniversities
            .flatMap(uni => uni.departments.map(dept => translate.degreeLevel(dept.degree_level)))
        )].sort(turkishSort);

        // Dil
        let degreeFilteredUniversities = universityTypeFilteredUniversities;
        if (preferences.selectedDegreeLevels.length > 0) {
            const selectedLevels = preferences.selectedDegreeLevels.map(turkishLevel => 
                reverseTranslate.degreeLevel(turkishLevel)
            );
            degreeFilteredUniversities = degreeFilteredUniversities.map(uni => ({
                ...uni,
                departments: uni.departments.filter(dept => 
                    selectedLevels.includes(dept.degree_level)
                )
            })).filter(uni => uni.departments.length > 0);
        }
        let languages: string[] = [...new Set(degreeFilteredUniversities
            .flatMap(uni => uni.departments.map(dept => dept.language))
        )].sort(turkishSort);

        // Eğitim türü
        let languageFilteredUniversities = degreeFilteredUniversities;
        if (preferences.selectedLanguages.length > 0) {
            languageFilteredUniversities = languageFilteredUniversities.map(uni => ({
                ...uni,
                departments: uni.departments.filter(dept => 
                    preferences.selectedLanguages.includes(dept.language)
                )
            })).filter(uni => uni.departments.length > 0);
        }
        let educationTypes: string[] = [...new Set(languageFilteredUniversities
            .flatMap(uni => uni.departments.map(dept => translate.educationType(dept.education_type)))
        )].sort(turkishSort);

        // Üniversite adı (en son, tüm filtrelere göre)
        let educationTypeFilteredUniversities = languageFilteredUniversities;
        if (preferences.educationType.length > 0) {
            const selectedEduTypes = preferences.educationType.map(turkishType => 
                reverseTranslate.educationType(turkishType)
            );
            educationTypeFilteredUniversities = educationTypeFilteredUniversities.map(uni => ({
                ...uni,
                departments: uni.departments.filter(dept => 
                    selectedEduTypes.includes(dept.education_type)
                )
            })).filter(uni => uni.departments.length > 0);
        }
        let universityNames: string[] = [...new Set(educationTypeFilteredUniversities.map(uni => uni.name))].sort(turkishSort);

        // Orijinal tüm seçenekleri sakla
        const allCities = [...new Set(universities.map(uni => uni.city))].sort(turkishSort);
        const allDepartments = [...new Set(universities.flatMap(uni => uni.departments.map(dept => dept.name)))].sort(turkishSort);
        const allUniversityTypes = [...new Set(universities.map(uni => translate.universityType(uni.university_type)))].sort(turkishSort);
        const allDegreeLevels = [...new Set(universities.flatMap(uni => uni.departments.map(dept => translate.degreeLevel(dept.degree_level))))].sort(turkishSort);
        const allLanguages = [...new Set(universities.flatMap(uni => uni.departments.map(dept => dept.language)))].sort(turkishSort);
        const allEducationTypes = [...new Set(universities.flatMap(uni => uni.departments.map(dept => translate.educationType(dept.education_type))))].sort(turkishSort);
        const allUniversities = [...new Set(universities.map(uni => uni.name))].sort(turkishSort);

        setAllOptions({
            cities: allCities,
            departments: allDepartments,
            universityTypes: allUniversityTypes,
            degreeLevels: allDegreeLevels,
            languages: allLanguages,
            educationTypes: allEducationTypes,
            universities: allUniversities
        });

        setQuestions(prevQuestions => [
            { ...prevQuestions[0], options: cities },
            { ...prevQuestions[1], options: departments },
            { ...prevQuestions[2], options: universityTypes },
            { ...prevQuestions[3], options: degreeLevels },
            { ...prevQuestions[4], options: languages },
            { ...prevQuestions[5], options: educationTypes },
            { ...prevQuestions[6], options: universityNames },
            { ...prevQuestions[7], options: [] },
            { ...prevQuestions[8], options: [] },
        ]);

        type StringArrayKeys =
            'selectedCities' |
            'selectedDepartments' |
            'selectedUniversityTypes' |
            'selectedDegreeLevels' |
            'selectedLanguages' |
            'educationType' |
            'selectedUniversities';

        setPreferences(prev => {
            let updated = { ...prev };
            let changed = false;
            const autoSelect: { key: StringArrayKeys, options: string[] }[] = [
                { key: 'selectedCities', options: cities },
                { key: 'selectedDepartments', options: departments },
                { key: 'selectedUniversityTypes', options: universityTypes },
                { key: 'selectedDegreeLevels', options: degreeLevels },
                { key: 'selectedLanguages', options: languages },
                { key: 'educationType', options: educationTypes },
                { key: 'selectedUniversities', options: universityNames },
            ];
            autoSelect.forEach(({ key, options }) => {
                const current = prev[key];
                if (options.length === 1 && (!current || current.length === 0)) {
                    updated[key] = [options[0]];
                    changed = true;
                }
            });
            return changed ? updated : prev;
        });
    };

    const selectAllOptions = useCallback(async (questionId: string, options: string[]) => {
        if (options.length === 0) return;

        setIsSelectingAll(true);
        setSelectAllProgress(0);
        
        const keyMap: { [key: string]: keyof UserPreferences } = {
            'cities': 'selectedCities',
            'departments': 'selectedDepartments',
            'universityTypes': 'selectedUniversityTypes',
            'degreeLevels': 'selectedDegreeLevels',
            'languages': 'selectedLanguages',
            'educationType': 'educationType',
            'universities': 'selectedUniversities',
        };
        
        const flagMap = {
            cities: 'cities',
            departments: 'departments',
            universityTypes: 'universityTypes',
            degreeLevels: 'degreeLevels',
            languages: 'languages',
            educationType: 'educationType',
            universities: 'universities',
        } as const;
        
        type KeyKeys = keyof typeof keyMap;
        type FlagKeys = keyof typeof flagMap;
        const key = keyMap[questionId as KeyKeys];
        const flagKey = flagMap[questionId as FlagKeys];
        if (!key || !flagKey) return;

        // For large datasets, use batch processing
        const batchSize = 100;
        const totalBatches = Math.ceil(options.length / batchSize);
        
        for (let i = 0; i < totalBatches; i++) {
            const start = i * batchSize;
            const end = Math.min(start + batchSize, options.length);
            const batch = options.slice(start, end);
            
            // Update progress
            setSelectAllProgress((i + 1) / totalBatches);
            
            // Use setTimeout to allow UI to update
            await new Promise(resolve => {
                setTimeout(() => {
                    setPreferences(prev => {
                        const currentValues = (prev[key] as string[]) || [];
                        const newValues = [...new Set([...currentValues, ...batch])];
                        let newPrefs = { ...prev, [key]: newValues };
                        newPrefs = resetLowerFilters(newPrefs, key);
                        
                        // Set selectAll flag
                        if (flagKey && newPrefs.selectAllFlags) {
                            newPrefs.selectAllFlags = {
                                ...newPrefs.selectAllFlags,
                                [flagKey]: true
                            };
                        }
                        
                        return newPrefs;
                    });
                    resolve(true);
                }, 0);
            });
        }
        
        setIsSelectingAll(false);
        setSelectAllProgress(0);
    }, []);

    const handleNext = async () => {
        const currentQuestion = questions[currentStep];
        const keyMap: { [key: string]: keyof UserPreferences } = {
            'cities': 'selectedCities',
            'departments': 'selectedDepartments',
            'universityTypes': 'selectedUniversityTypes',
            'degreeLevels': 'selectedDegreeLevels',
            'languages': 'selectedLanguages',
            'educationType': 'educationType',
            'universities': 'selectedUniversities',
        };
        
        const key = keyMap[currentQuestion.id];
        const currentValues = key ? (preferences[key] as string[]) || [] : [];
        const hasSelections = currentValues.length > 0;
        const hasOptions = (currentQuestion.options || []).length > 0;
        
        if (!hasSelections && hasOptions && currentQuestion.type === "multiSelect") {
            setShowAllSelected(true);
            
            await selectAllOptions(currentQuestion.id, currentQuestion.options || []);
            
            if (selectAllTimeoutRef.current) {
                clearTimeout(selectAllTimeoutRef.current);
            }
            
            selectAllTimeoutRef.current = setTimeout(() => {
                setShowAllSelected(false);
                if (currentStep < questions.length - 1) {
                    setCurrentStep(currentStep + 1);
                    setTimeout(() => {
                        smoothScrollToTop();
                    }, 100);
                } else {
                    filterResults(1).then(() => {
                        setShowResults(true);
                        setTimeout(() => {
                            smoothScrollToTop();
                        }, 100);
                    });
                }
            }, 500); // Reduced from 800ms to 500ms
            return;
        }
        
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setTimeout(() => {
                smoothScrollToTop();
            }, 100);
        } else {
            await filterResults(1);
            setShowResults(true);
            setTimeout(() => {
                smoothScrollToTop();
            }, 100);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setTimeout(() => {
                smoothScrollToTop();
            }, 100);
        }
    };

    const handleMultiSelect = (value: string, questionId: string) => {
        setPreferences(prev => {
            const keyMap: { [key: string]: keyof UserPreferences } = {
                'cities': 'selectedCities',
                'departments': 'selectedDepartments',
                'universityTypes': 'selectedUniversityTypes',
                'degreeLevels': 'selectedDegreeLevels',
                'languages': 'selectedLanguages',
                'educationType': 'educationType',
                'universities': 'selectedUniversities',
            };
            
            const flagMap = {
                cities: 'cities',
                departments: 'departments',
                universityTypes: 'universityTypes',
                degreeLevels: 'degreeLevels',
                languages: 'languages',
                educationType: 'educationType',
                universities: 'universities',
            } as const;
            
            const key = keyMap[questionId];
            const flagKey = flagMap[questionId as keyof typeof flagMap];
            
            if (!key) {
                console.error('Bilinmeyen soru ID:', questionId);
                return prev;
            }
            
            const currentValues = (prev[key] as string[]) || [];
            let newValues;
            if (currentValues.includes(value)) {
                newValues = currentValues.filter(v => v !== value);
            } else {
                newValues = [...currentValues, value];
            }
            
            let newPrefs = { ...prev, [key]: newValues };
            newPrefs = resetLowerFilters(newPrefs, key);
            
            // Manuel seçim yapıldığında selectAll flag'ini false yap
            if (flagKey && newPrefs.selectAllFlags) {
                newPrefs.selectAllFlags = {
                    ...newPrefs.selectAllFlags,
                    [flagKey]: false
                };
            }
            
            return newPrefs;
        });
    };

    const handleRangeChange = (type: 'min' | 'max', value: number, questionId: string) => {
        setPreferences(prev => ({
            ...prev,
            [questionId === 'scoreRange' ? (type === 'min' ? 'minScore' : 'maxScore') : (type === 'min' ? 'minRank' : 'maxRank')]: value
        }));
    };

    const handleRankInputChange = (type: 'min' | 'max', value: string, questionId: string) => {
        const cleaned = value.replace(/[^\d]/g, '');
        const formattedValue = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const numericValue = formattedValue.replace(/\./g, '');
        const finalValue = numericValue ? parseInt(numericValue, 10) : null;
        
        setPreferences(prev => ({
            ...prev,
            [type === 'min' ? 'minRank' : 'maxRank']: finalValue
        }));
    };

    const getDisplayRank = (value: number | undefined): string => {
        if (value === undefined || value === null) return '';
        return value.toLocaleString('tr-TR');
    };

    const handleSortChange = async (sortBy: string, sortOrder: string) => {
        const newPreferences = {
            ...preferences,
            sortBy,
            sortOrder
        };
        setPreferences(newPreferences);
        await filterResultsWithPreferences(newPreferences, 1);
    };

    const buildApiUrl = (prefs: UserPreferences, page: number = 1, limit: number = 5) => {
        const params = new URLSearchParams();
        
        // Şehir filtresi - eğer tümünü seç flag'i true ise filtre ekleme
        if (prefs.selectedCities.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.cities)) {
            const isAllCitiesSelected = prefs.selectedCities.length === allOptions.cities.length && 
                allOptions.cities.every(city => prefs.selectedCities.includes(city));
            if (!isAllCitiesSelected) {
                params.append('city', prefs.selectedCities.join(','));
            }
        }
        // Bölüm filtresi
        if (prefs.selectedDepartments.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.departments)) {
            const isAllDepartmentsSelected = prefs.selectedDepartments.length === allOptions.departments.length && 
                allOptions.departments.every(dept => prefs.selectedDepartments.includes(dept));
            if (!isAllDepartmentsSelected) {
                const departmentSlugs = prefs.selectedDepartments.flatMap(name => {
                    return universities.flatMap(uni => 
                        uni.departments
                            .filter(dept => dept.name === name)
                            .map(dept => dept.slug)
                    );
                });
                if (departmentSlugs.length > 0) {
                    params.append('department', [...new Set(departmentSlugs)].join(','));
                }
            }
        }
        // Üniversite türü filtresi
        if (prefs.selectedUniversityTypes.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.universityTypes)) {
            const isAllUniversityTypesSelected = prefs.selectedUniversityTypes.length === allOptions.universityTypes.length && 
                allOptions.universityTypes.every(type => prefs.selectedUniversityTypes.includes(type));
            if (!isAllUniversityTypesSelected) {
                const universityTypes = prefs.selectedUniversityTypes.map(turkishType => 
                    reverseTranslate.universityType(turkishType)
                );
                params.append('university_type', universityTypes.join(','));
            }
        }
        // Eğitim seviyesi filtresi
        if (prefs.selectedDegreeLevels.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.degreeLevels)) {
            const isAllDegreeLevelsSelected = prefs.selectedDegreeLevels.length === allOptions.degreeLevels.length && 
                allOptions.degreeLevels.every(level => prefs.selectedDegreeLevels.includes(level));
            if (!isAllDegreeLevelsSelected) {
                const degreeLevels = prefs.selectedDegreeLevels.map(turkishLevel => 
                    reverseTranslate.degreeLevel(turkishLevel)
                );
                params.append('degree_level', degreeLevels.join(','));
            }
        }
        // Dil filtresi
        if (prefs.selectedLanguages.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.languages)) {
            const isAllLanguagesSelected = prefs.selectedLanguages.length === allOptions.languages.length && 
                allOptions.languages.every(lang => prefs.selectedLanguages.includes(lang));
            if (!isAllLanguagesSelected) {
                params.append('language', prefs.selectedLanguages.join(','));
            }
        }
        // Eğitim türü filtresi
        if (prefs.educationType.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.educationType)) {
            const isAllEducationTypesSelected = prefs.educationType.length === allOptions.educationTypes.length && 
                allOptions.educationTypes.every(type => prefs.educationType.includes(type));
            if (!isAllEducationTypesSelected) {
                const englishTypes = prefs.educationType.map(turkishType => 
                    reverseTranslate.educationType(turkishType)
                );
                params.append('education_type', englishTypes.join(','));
            }
        }
        // Üniversite adı filtresi
        if (prefs.selectedUniversities.length > 0 && !(prefs.selectAllFlags && prefs.selectAllFlags.universities)) {
            const isAllUniversitiesSelected = prefs.selectedUniversities.length === allOptions.universities.length && 
                allOptions.universities.every(uni => prefs.selectedUniversities.includes(uni));
            if (!isAllUniversitiesSelected) {
                const universitySlugs = prefs.selectedUniversities.map(uniName => {
                    const university = universities.find(u => u.name === uniName);
                    return university?.slug || uniName.toLowerCase()
                        .replace(/[çğıöşü]/g, (match) => {
                            const map: { [key: string]: string } = {
                                'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u'
                            };
                            return map[match] || match;
                        })
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '');
                });
                params.append('university', universitySlugs.join(','));
            }
        }
        if (prefs.minScore) {
            params.append('base_score_min', prefs.minScore.toString());
        }
        if (prefs.maxScore) {
            params.append('base_score_max', prefs.maxScore.toString());
        }
        if (prefs.minRank) {
            params.append('base_rank_min', prefs.minRank.toString());
        }
        if (prefs.maxRank) {
            params.append('base_rank_max', prefs.maxRank.toString());
        }
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (prefs.sortBy) {
            params.append('sort_by', prefs.sortBy);
        }
        if (prefs.sortOrder) {
            params.append('sort_order', prefs.sortOrder);
        }
        return `/schools/universities?${params.toString()}`;
    };

    const filterResults = async (page: number = 1) => {
        await filterResultsWithPreferences(preferences, page);
    };

    const filterResultsWithPreferences = async (prefs: UserPreferences, page: number = 1) => {
        setLoading(true);
        try {
            const apiUrl = buildApiUrl(prefs, page, pagination.limit);
            const data = await getRequest(apiUrl);
            
            if (data && typeof data === 'object' && 'data' in data) {
                const results = data.data || [];
                const totalResults = data.totalResults || data.total || results.length;
                const totalPages = data.totalPages || Math.ceil(totalResults / pagination.limit);
                
                setFilteredResults(results);
                setPagination(prev => ({
                    ...prev,
                    currentPage: page,
                    totalPages: totalPages,
                    totalResults: totalResults
                }));
            } else if (data && Array.isArray(data)) {
                setFilteredResults(data);
                setPagination(prev => ({
                    ...prev,
                    currentPage: page,
                    totalPages: Math.ceil(data.length / pagination.limit),
                    totalResults: data.length
                }));
            } else {
                setFilteredResults([]);
                setPagination(prev => ({
                    ...prev,
                    currentPage: page,
                    totalPages: 1,
                    totalResults: 0
                }));
            }
        } catch (error) {
            console.error("Filtrelenmiş sonuçlar alınamadı:", error);
            setFilteredResults([]);
            setPagination(prev => ({
                ...prev,
                currentPage: page,
                totalPages: 1,
                totalResults: 0
            }));
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            filterResultsWithPreferences(preferences, newPage);
            setTimeout(() => {
                smoothScrollToTop();
            }, 100);
        }
    };

    const resetPreferences = () => {
        setPreferences({
            selectedCities: [],
            selectedUniversityTypes: [],
            selectedDepartments: [],
            selectedDegreeLevels: [],
            selectedLanguages: [],
            educationType: [],
            selectedUniversities: [],
            sortBy: "score",
            sortOrder: "desc",
            selectAllFlags: {
                cities: false,
                departments: false,
                universityTypes: false,
                degreeLevels: false,
                languages: false,
                educationType: false,
                universities: false
            }
        });
        setCurrentStep(0);
        setShowResults(false);
        setFilteredResults([]);
        setPagination({
            currentPage: 1,
            totalPages: 1,
            totalResults: 0,
            limit: 5
        });
    };

    const getFilteredOptions = (options: string[]) => {
        if (!searchTerm.trim()) return options;
        
        const searchLower = searchTerm.toLowerCase();
        return options.filter(option => 
            option.toLowerCase().includes(searchLower) ||
            option.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchLower)
        );
    };

    const handleScroll = useCallback(() => {
        if (!optionsContainerRef.current || isLoadingMore) return;
        
        const container = optionsContainerRef.current;
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;
        
        // Check if we're near the bottom (within 100px)
        const isNearBottom = scrollTop + containerHeight >= scrollHeight - 100;
        
        if (isNearBottom) {
            const filteredOptions = getFilteredOptions(questions[currentStep]?.options || []);
            
            if (displayCount < filteredOptions.length) {
                setIsLoadingMore(true);
                
                setTimeout(() => {
                    setDisplayCount(prev => Math.min(prev + 20, filteredOptions.length));
                    setIsLoadingMore(false);
                }, 200);
            }
        }
    }, [isLoadingMore, currentStep, questions, displayCount]);

    // Throttled scroll handler
    const throttledScrollHandler = useCallback(() => {
        let ticking = false;
        
        return () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
    }, [handleScroll]);

    const renderQuestion = () => {
        const question = questions[currentStep];
        
        const keyMap: { [key: string]: keyof UserPreferences } = {
            'cities': 'selectedCities',
            'departments': 'selectedDepartments',
            'universityTypes': 'selectedUniversityTypes',
            'degreeLevels': 'selectedDegreeLevels',
            'languages': 'selectedLanguages',
            'educationType': 'educationType',
            'universities': 'selectedUniversities',
        };
        
        const key = keyMap[question.id];
        const currentValues = key ? (preferences[key] as string[]) || [] : [];
        const filteredOptions = getFilteredOptions(question.options || []);

        const getActiveFiltersInfo = () => {
            const activeFilters = [];
            
            if (preferences.selectedCities.length > 0) {
                activeFilters.push(`${preferences.selectedCities.length} şehir seçili`);
            }
            
            if (preferences.selectedDepartments.length > 0) {
                activeFilters.push(`${preferences.selectedDepartments.length} bölüm seçili`);
            }
            
            if (preferences.selectedUniversityTypes.length > 0) {
                activeFilters.push(`${preferences.selectedUniversityTypes.length} üniversite türü seçili`);
            }
            
            if (preferences.selectedUniversities.length > 0) {
                activeFilters.push(`${preferences.selectedUniversities.length} üniversite seçili`);
            }
            
            if (preferences.selectedDegreeLevels.length > 0) {
                activeFilters.push(`${preferences.selectedDegreeLevels.length} eğitim seviyesi seçili`);
            }
            
            if (preferences.selectedLanguages.length > 0) {
                activeFilters.push(`${preferences.selectedLanguages.length} dil seçili`);
            }
            
            if (preferences.educationType.length > 0) {
                activeFilters.push(`${preferences.educationType.length} eğitim türü seçili`);
            }
            
            return activeFilters;
        };

        const activeFilters = getActiveFiltersInfo();

        if (question.type === "multiSelect") {
            const hasNoOptions = (question.options || []).length === 0;
            const hasNoFilteredOptions = filteredOptions.length === 0;
            const isSearchFiltered = searchTerm.trim() !== "";

            return (
                <div className="space-y-4">
                    {/* Aktif Filtreler Bilgisi */}
                    {activeFilters.length > 0 && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <span className="font-medium">Aktif Filtreler:</span> {activeFilters.join(', ')}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                Seçenekler bu filtrelere göre güncellenmiştir.
                            </p>
                        </div>
                    )}

                    {/* Seçenek Yok Uyarısı */}
                    {hasNoOptions && !isSearchFiltered && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <FiInfo className="w-5 h-5 text-yellow-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-yellow-900 mb-1">
                                        Seçenek Bulunamadı
                                    </h4>
                                    <p className="text-sm text-yellow-700 leading-relaxed mb-3">
                                        Seçtiğiniz önceki filtreler bu adım için hiç seçenek bırakmadı. 
                                        Daha fazla seçenek görmek için önceki adımlardaki seçimlerinizi genişletebilirsiniz.
                                    </p>
                                    <button
                                        onClick={() => {
                                            if (currentStep > 0) {
                                                setCurrentStep(currentStep - 1);
                                                const keyMap: { [key: string]: keyof UserPreferences } = {
                                                    'cities': 'selectedCities',
                                                    'universities': 'selectedUniversities',
                                                    'languages': 'selectedLanguages',
                                                    'educationType': 'educationType',
                                                    'departments': 'selectedDepartments'
                                                };
                                                const key = keyMap[questions[currentStep - 1].id];
                                                if (key) {
                                                    setPreferences(prev => ({
                                                        ...prev,
                                                        [key]: []
                                                    }));
                                                }
                                            }
                                        }}
                                        className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md hover:bg-yellow-200 transition-colors"
                                    >
                                        Önceki Adıma Dön ve Seçimleri Temizle
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Arama Inputu */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={question.title}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <svg 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Sonuç Sayısı */}
                    {searchTerm && (
                        <p className="text-sm text-gray-600">
                            {filteredOptions.length} sonuç bulundu
                        </p>
                    )}

                    {!searchTerm && filteredOptions.length > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{filteredOptions.length} seçenek</span>
                            {filteredOptions.length > 200 && (
                                <div className="flex items-center gap-2 text-yellow-600">
                                    <FiInfo className="w-4 h-4" />
                                    <span>Çok fazla seçenek var. Arama yaparak filtreleyebilirsiniz.</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Seçenekler */}
                    <div 
                        ref={optionsContainerRef}
                        onScroll={throttledScrollHandler()}
                        className="space-y-3 max-h-96 overflow-y-auto"
                    >
                        {/* Progress Indicator for Select All */}
                        {isSelectingAll && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-900">
                                            Tüm seçenekler seçiliyor...
                                        </p>
                                        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${selectAllProgress * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-blue-700 mt-1">
                                            %{Math.round(selectAllProgress * 100)} tamamlandı
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {filteredOptions.length > 0 ? (
                            <>
                                {/* Virtual scrolling - only render visible options */}
                                {displayedOptions.map((option, index) => (
                                    <button
                                        key={`${option}-${index}`}
                                        onClick={() => handleMultiSelect(option, question.id)}
                                        disabled={isSelectingAll}
                                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                                            showAllSelected || currentValues.includes(option)
                                                ? "border-primary bg-primaryLight text-primary"
                                                : "border-gray-200 bg-white hover:border-primaryLight"
                                        } ${isSelectingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium truncate pr-2">{option}</span>
                                            {(showAllSelected || currentValues.includes(option)) && (
                                                <FiCheck className="w-5 h-5 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                                
                                {/* Loading more indicator */}
                                {isLoadingMore && displayedOptions.length < filteredOptions.length && (
                                    <div className="flex items-center justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                        <span className="ml-2 text-sm text-gray-600">Daha fazla yükleniyor...</span>
                                    </div>
                                )}
                                
                                {/* Show total count for all datasets */}
                                {filteredOptions.length > 20 && (
                                    <div className="text-center py-4 text-sm text-gray-500 border-t border-gray-100">
                                        <span className="font-medium">{displayedOptions.length}</span> / <span className="font-medium">{filteredOptions.length}</span> seçenek gösteriliyor
                                        {displayedOptions.length < filteredOptions.length && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                Daha fazla görmek için aşağı kaydırın
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {isSearchFiltered ? (
                                    <>
                                        <p>Arama kriterinize uygun sonuç bulunamadı.</p>
                                        <p className="text-sm mt-1">Farklı bir arama terimi deneyin.</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Bu adım için seçenek bulunamadı.</p>
                                        <p className="text-sm mt-1">Önceki adımlardaki seçimlerinizi genişletin.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (question.type === "range") {
            const isScore = question.id === "scoreRange";
            const minValue = isScore ? preferences.minScore : preferences.minRank;
            const maxValue = isScore ? preferences.maxScore : preferences.maxRank;

            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum {isScore ? "Puan" : "Sıralama"}
                            </label>
                            {isScore ? (
                                <input
                                    type="number"
                                    value={minValue || ""}
                                    onChange={(e) => handleRangeChange('min', Number(e.target.value), question.id)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Min puan"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={getDisplayRank(minValue)}
                                    onChange={(e) => handleRankInputChange('min', e.target.value, question.id)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Min sıralama (örn: 850.000)"
                                />
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2">
                                Maksimum {isScore ? "Puan" : "Sıralama"}
                            </label>
                            {isScore ? (
                                <input
                                    type="number"
                                    value={maxValue || ""}
                                    onChange={(e) => handleRangeChange('max', Number(e.target.value), question.id)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Max puan"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={getDisplayRank(maxValue)}
                                    onChange={(e) => handleRankInputChange('max', e.target.value, question.id)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Max sıralama (örn: 1.250.000)"
                                />
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    const renderResults = () => {
        if (loading) {
            return (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Sonuçlar filtreleniyor...</p>
                </div>
            );
        }

        if (filteredResults.length === 0) {
            return (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                            <FiX className="w-12 h-12 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Sonuç Bulunamadı
                        </h3>
                        <p className="text-gray-600 mb-2">
                            Seçtiğiniz kriterlere uygun üniversite bulunamadı.
                        </p>
                        <p className="text-gray-500 text-sm mb-8">
                            Filtrelerinizi genişletmeyi veya farklı kriterler denemeyi öneriyoruz.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={handleFilterChange}
                                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryDark transition-colors font-medium"
                            >
                                Filtreleri Düzenle
                            </button>
                            <button
                                onClick={resetPreferences}
                                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                Filtreleri Sıfırla
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {pagination.totalResults} Üniversite Bulundu
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Sıralama Dropdown */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                            <label className="text-sm font-medium text-gray-700">Sırala:</label>
                            <select
                                value={`${preferences.sortBy}-${preferences.sortOrder}`}
                                onChange={(e) => {
                                    const [sortBy, sortOrder] = e.target.value.split('-');
                                    handleSortChange(sortBy, sortOrder);
                                }}
                                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            >
                                <option value="score-desc">Taban Puan (Yüksekten Düşüğe)</option>
                                <option value="score-asc">Taban Puan (Düşükten Yükseğe)</option>
                                <option value="rank-asc">Taban Sıralama (Düşükten Yükseğe)</option>
                                <option value="rank-desc">Taban Sıralama (Yüksekten Düşüğe)</option>
                                <option value="quota-desc">Kontenjan (Yüksekten Düşüğe)</option>
                                <option value="quota-asc">Kontenjan (Düşükten Yükseğe)</option>
                                <option value="placed-desc">Yerleşen Sayısı (Yüksekten Düşüğe)</option>
                                <option value="placed-asc">Yerleşen Sayısı (Düşükten Yükseğe)</option>
                                <option value="name-asc">Üniversite Adı (A-Z)</option>
                                <option value="name-desc">Üniversite Adı (Z-A)</option>
                            </select>
                        </div>
                        <button
                            onClick={handleFilterChange}
                            className="w-full sm:w-auto text-primary font-medium flex items-center justify-center sm:justify-start gap-2 px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            <FiSettings className="w-4 h-4" />
                            Filtreleri Düzenle
                        </button>
                    </div>
                </div>
                
                {filteredResults.map((uni) => (
                    <div key={uni.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                                    <Link 
                                        href={`/egitim/${uni.slug}`}
                                        target="_blank"
                                        className="group inline-flex items-center gap-1 hover:underline text-primary transition-colors duration-200"
                                        aria-label={`${uni.name} detay sayfasına git`}
                                    >
                                        {uni.name}
                                        <span className="ml-1 group-hover:translate-x-1 transition-transform">
                                            <FiArrowRight className="w-4 h-4 inline-block" />
                                        </span>
                                    </Link>
                                </h3>
                                <p className="text-gray-600 truncate">{uni.city} / {uni.district}</p>
                                <p className="text-sm text-gray-500 capitalize">{translate.universityType(uni.university_type)}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="text-sm text-gray-600">{uni.contacts.phone}</p>
                                <a 
                                    href={uni.contacts.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primaryDark text-sm"
                                >
                                    Website
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {uni.departments.map((dept, idx) => {
                                const sortedYears = [...dept.yearly_data]
                                    .sort((a, b) => b.year - a.year);
                                
                                return (
                                    <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-lg text-gray-900 truncate">
                                                    {dept.name} - {dept.language}
                                                </h4>
                                                <p className="text-gray-700 truncate">{dept.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {translate.educationType(dept.education_type)} • {dept.duration}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {sortedYears.map((yearData, yearIdx) => (
                                                <div key={yearIdx} className="bg-white p-4 rounded-lg border border-gray-100">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h5 className="font-medium text-gray-900">
                                                            {yearData.year} Yılı Verileri
                                                        </h5>
                                                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                                            {yearData.year}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-gray-600">Kontenjan</p>
                                                            <p className="font-semibold text-gray-900">{yearData.quota}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-gray-600">Taban Puan</p>
                                                            <p className="font-semibold text-gray-900">{yearData.base_score.toFixed(2)}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-gray-600">Tavan Puan</p>
                                                            <p className="font-semibold text-gray-900">{yearData.top_score.toFixed(2)}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-gray-600">Taban Sıralama</p>
                                                            <p className="font-semibold text-gray-900">{yearData.base_rank.toLocaleString()}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-gray-600">Tavan Sıralama</p>
                                                            <p className="font-semibold text-gray-900">{yearData.top_rank.toLocaleString()}</p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <p className="text-gray-600">Yerleşen</p>
                                                            <p className="font-semibold text-gray-900">{yearData.placement}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                <div className="mt-8">
                    {renderPagination()}
                </div>
            </div>
        );
    };

    const handleFilterChange = () => {
        setShowResults(false);
        setCurrentStep(0);
        setPagination(prev => ({
            ...prev,
            currentPage: 1
        }));
        setTimeout(() => {
            smoothScrollToTop();
        }, 100);
    };

    const renderPagination = () => {
        if (pagination.totalResults === 0) {
            return (
                <div className="text-center text-gray-500">Hiç sonuç bulunamadı</div>
            );
        }
        
        if (pagination.totalPages <= 1) {
            return (
                <div className="flex items-center justify-center mt-8">
                    <div className="text-sm text-gray-700">
                        Toplam <span className="font-medium">{pagination.totalResults}</span> üniversite bulundu
                    </div>
                </div>
            );
        }

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-2 text-sm font-medium border ${
                        i === pagination.currentPage
                            ? "bg-primary text-white border-primary"
                            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-current={i === pagination.currentPage ? 'page' : undefined}
                >
                    {i}
                </button>
            );
        }

        if (endPage < pagination.totalPages) {
            if (endPage < pagination.totalPages - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={pagination.totalPages}
                    onClick={() => handlePageChange(pagination.totalPages)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50"
                >
                    {pagination.totalPages}
                </button>
            );
        }

        return (
            <div className="flex flex-col items-center gap-4">
                <nav aria-label="Sayfalama">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${
                                pagination.currentPage === 1
                                    ? "text-gray-300 bg-gray-100 border-gray-200 cursor-not-allowed"
                                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            <FiArrowLeft className="w-4 h-4 mr-1" />
                            Önceki
                        </button>
                        
                        <div className="hidden sm:flex items-center space-x-1">
                            {pages}
                        </div>
         
                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${
                                pagination.currentPage === pagination.totalPages
                                    ? "text-gray-300 bg-gray-100 border-gray-200 cursor-not-allowed"
                                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            Sonraki
                            <FiArrowRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </nav>
                <div className="text-sm text-gray-700 text-center">
                    Sayfa <span className="font-medium">{pagination.currentPage}</span> / <span className="font-medium">{pagination.totalPages}</span>
                    <span className="hidden sm:inline">
                    {" "}&bull; Toplam <span className="font-medium">{pagination.totalResults}</span> sonuç
                    </span>
                </div>
            </div>
        );
    };
    
    const resetLowerFilters = (prev: UserPreferences, changedKey: keyof UserPreferences) => {
        const filterOrder: (keyof UserPreferences)[] = [
            'selectedCities',
            'selectedDepartments',
            'selectedUniversityTypes',
            'selectedDegreeLevels',
            'selectedLanguages',
            'educationType',
            'selectedUniversities',
        ];
        const changedIndex = filterOrder.indexOf(changedKey);
        if (changedIndex === -1) return prev;
        const newPrefs = { ...prev };
        for (let i = changedIndex + 1; i < filterOrder.length; i++) {
            const key = filterOrder[i];
            if (Array.isArray(prev[key])) {
                (newPrefs as any)[key] = [];
            }
        }
        return newPrefs;
    };

    if (loading) {
        return (
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Üniversite verileri yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={scrollToTop} className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-6 pb-6 md:pb-12">
            <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                    {showResults ? "Üniversite Tercih Sonuçları" : "YKS Tercih Robotu"}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {showResults 
                        ? "Seçtiğiniz kriterlere uygun üniversite ve bölümler aşağıda listelenmiştir. Detaylı bilgileri inceleyebilir ve karşılaştırabilirsiniz."
                        : "Size en uygun üniversite ve bölümleri bulmak için birkaç soru soracağız"
                    }
                </p>
            </div>

            {!showResults ? (
                <div className="max-w-4xl mx-auto w-full">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Adım {currentStep + 1} / {questions.length}
                            </span>
                            <span className="text-sm text-gray-500">
                                %{Math.round(((currentStep + 1) / questions.length) * 100)}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        {/* Uyarı Mesajı */}
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <FiInfo className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                                        İsteğe Bağlı Seçim
                                    </h4>
                                    <p className="text-sm text-blue-700 leading-relaxed">
                                        Seçim yapmak zorunda değilsiniz. Hiçbirini seçmezseniz, tüm seçenekler geçerli sayılır.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {questions[currentStep].title}
                        </h2>
                        <p className="text-gray-600 mb-8">
                            {questions[currentStep].subtitle}
                        </p>
                        
                        {renderQuestion()}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                                currentStep === 0
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Geri
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={
                                questions[currentStep].type === "multiSelect" && 
                                (questions[currentStep].options || []).length === 0 ||
                                isSelectingAll
                            }
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                                questions[currentStep].type === "multiSelect" && 
                                (questions[currentStep].options || []).length === 0 ||
                                isSelectingAll
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-primary text-white hover:bg-primaryDark"
                            }`}
                        >
                            {(() => {
                                if (isSelectingAll) {
                                    return (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Seçiliyor...
                                        </>
                                    );
                                }
                                
                                const currentQuestion = questions[currentStep];
                                const keyMap: { [key: string]: keyof UserPreferences } = {
                                    'cities': 'selectedCities',
                                    'departments': 'selectedDepartments',
                                    'universityTypes': 'selectedUniversityTypes',
                                    'degreeLevels': 'selectedDegreeLevels',
                                    'languages': 'selectedLanguages',
                                    'educationType': 'educationType',
                                    'universities': 'selectedUniversities',
                                };
                                
                                const key = keyMap[currentQuestion.id];
                                const currentValues = key ? (preferences[key] as string[]) || [] : [];
                                const hasSelections = currentValues.length > 0;
                                const hasOptions = (currentQuestion.options || []).length > 0;
                                
                                if (currentStep === questions.length - 1) {
                                    return "Sonuçları Göster";
                                }
                                
                                if (currentQuestion.type === "multiSelect" && !hasSelections && hasOptions) {
                                    return "Tümünü Seç";
                                }
                                
                                return "İleri";
                            })()}
                            {!isSelectingAll && <FiArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            ) : (
                renderResults()
            )}
        </div>
    );
}