import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';

export const getProductList = async () => {
    const url = `${ApiConfig.products}`
    const response = await axios.get(url);
    return response.data;
};

export const getProductCategories = async () => {
    const response = await axios.get(ApiConfig.productCategories);
    return response.data;
};

export const addProduct = async (data: any) => {
    try {

        const response = await fetch(ApiConfig.addProduct, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        });
        return response.json();
    } catch (e) {
        return {
            error: true,
        };
    }
};
