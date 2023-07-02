import 'nprogress/nprogress.css';

import NProgress from 'nprogress';
import axios from 'axios';

const calculatePercentage = (loaded = 0, total = 1) => (Math.floor(loaded * 1.0) / total);
const updatePercentage = e => NProgress.inc(calculatePercentage(e.loaded, e.total));

export function loadAxiosProgress(config) {
    let _requestsCounter = 0;

    const setupStartProgress = () => {
        axios.interceptors.request.use((config) => {
            _requestsCounter++;
            NProgress.start();

            return config;
        });
    };

    const setupUpdateProgress = () => {
        axios.defaults.onDownloadProgress = updatePercentage;
        axios.defaults.onUploadProgress = updatePercentage;
    };

    const setupStopProgress = () => {
        const responseFunc = (response) => {
            if ((--_requestsCounter) === 0) {
                NProgress.done();
            }

            return response;
        };

        const errorFunc = (error) => {
            if ((--_requestsCounter) === 0) {
                NProgress.done();
            }

            return Promise.reject(error);
        };

        axios.interceptors.response.use(responseFunc, errorFunc);
    };

    NProgress.configure(config);
    setupStartProgress();
    setupUpdateProgress();
    setupStopProgress();
}