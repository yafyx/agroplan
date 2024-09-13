export interface Prediction {
    predictions: {
        N: number;
        P: number;
        K: number;
    };
    comparisons: {
        N: string;
        P: string;
        K: string;
    };
    comparisons_value: {
        N: number;
        P: number;
        K: number;
    };
}

export interface AdditionalFertilizer {
    Urea: string;
    SP_36: string;
    MOP: string;
}