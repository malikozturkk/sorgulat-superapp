export interface University {
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

export interface Department {
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

export interface YearlyData {
    year: number;
    quota: number;
    base_score: number;
    top_score: number;
    base_rank: number;
    top_rank: number;
    placement: number;
}

export interface UserPreferences {
    selectedCities: string[];
    selectedUniversities: string[];
    selectedDepartments: string[];
    selectedLanguages: string[];
    selectedUniversityTypes: string[];
    selectedDegreeLevels: string[];
    educationType: string[];
    minScore?: number;
    maxScore?: number;
    minRank?: number;
    maxRank?: number;
    sortBy?: string;
    sortOrder?: string;
    selectAllFlags?: {
        cities: boolean;
        departments: boolean;
        universityTypes: boolean;
        degreeLevels: boolean;
        languages: boolean;
        educationType: boolean;
        universities: boolean;
    };
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    limit: number;
}