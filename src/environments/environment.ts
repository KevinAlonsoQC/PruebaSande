import packageInfo from '../../package.json';
export const environment = {
    appVersion: packageInfo.version,
    production: false,
    apiBase: 'https://sandeonline.cl:2082/taskfocus/maestros/api/Test'
};
