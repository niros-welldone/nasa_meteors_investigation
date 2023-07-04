export type YearsList = number[];

export type Geolocation = {
    type: string;
    coordinates: [number, number];
};

export type Data = {
    id: string;
    name: string;
    nametype: string;
    recclass: string;
    mass?: string;
    fall: string;
    year?: string;
    reclat?: string;
    reclong?: string;
    geolocation?: Geolocation;
};

export type Filter = {
    year?: number;
    mass?: number;
};
