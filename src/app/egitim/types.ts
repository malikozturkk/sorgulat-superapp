interface University {
    id: string;
    name: string;
    slug: string;
    city: string;
    district: string;
    university_type: string;
    contacts: {
        phone: string;
        faks: string;
        website: string;
        mail: string;
        address: string;
        rector: {
            name: string;
            surname: string;
        };
    };
    departments: Department[];
}

interface Department {
    name: string;
    slug: string;
    faculty: string;
    language: string;
    duration: string;
    degree_level: string;
    score_type: string;
    education_type: string;
    yearly_data: YearlyData[];
}

interface YearlyData {
    year: number;
    quota: number;
    base_score: number;
    top_score: number;
    base_rank: number;
    top_rank: number;
    placement: number;
}

interface UserPreferences {
    selectedCities: string[];
    selectedUniversities: string[];
    selectedFaculties: string[];
    selectedLanguages: string[];
    selectedUniversityTypes: string[];
    selectedDegreeLevels: string[];
    selectedScoreTypes: string[];
    educationType: string[];
    minScore?: number;
    maxScore?: number;
    minRank?: number;
    maxRank?: number;
    sortBy?: string;
    sortOrder?: string;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    limit: number;
}