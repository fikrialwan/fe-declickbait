import http from '../utility/http-commons';

const login = data => {
    return http.post('/login', data);
}

const postBerita = data => {
    return http.post('/berita', data);
}

const postBeritaExcel = data => {
    return http.post('/beritaExcel', data);
}

const getBerita = () => {
    return http.get('/berita');
}

const getBeritaByType = (type) => {
    return http.get(`/berita?type=${type}`);
}

const getTotal = (type) => (type) ? http.get(`/totalBerita?type=${type}`) : http.get('/totalBerita');

const getSumber = () => http.get('/sumberBerita');

const putBerita = (data, id) => {
    return http.put(`/berita/${id}`, data);
}

const deleteBerita = (id) => {
    return http.delete(`/berita/${id}`);
}

const deleteAllBerita = () => {
    return http.delete(`/berita`);
}

const getCommons = () => http.get('/commons');

const detection = data => http.post('/detection', data);

const getKata = (id) => http.get(`/kata/${id}`);

const train = () => http.get('/train');

const test = () => http.get('/test');

const services = {
    login,
    postBerita,
    postBeritaExcel,
    getBerita,
    getBeritaByType,
    getSumber,
    putBerita,
    deleteBerita,
    deleteAllBerita,
    detection,
    getCommons,
    getTotal,
    getKata,
    train,
    test,
};

export default services;
