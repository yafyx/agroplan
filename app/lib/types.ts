export interface Prediction {
    mean_values: { N: number; P: number; K: number; temperature: number; ph: number; humidity: number; rainfall: number; };
    recommendations: {
        N: number;
        P: number;
        K: number;
        temperature: number;
        ph: number;
        humidity: number;
        rainfall: number;
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
    crop_prediction: string;
    knn_accuracy: number;
    knn_train_accuracy: number;
    knn_test_accuracy: number;
}

export interface AdditionalFertilizer {
    Urea: string;
    SP_36: string;
    MOP: string;
}