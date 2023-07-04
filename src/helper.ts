import {Data, Filter} from "./types";

export const getFilteredData = (data: Data[], filters?: Filter) => (
    data.filter((item) => {
        const yearFilter = new Date(item.year || '').getFullYear() === filters?.year;
        const massFilter = !filters?.mass || ((item.mass || 0) > filters?.mass)
        return yearFilter && massFilter;
    })
);

