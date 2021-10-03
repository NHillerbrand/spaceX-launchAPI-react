import http from '../api.rest';

class LaunchDataService {
    private resourcePath: string = 'launches';
    
    /**
     * get one launch by Id
     * @param id id of launch
     * @returns Promise<any> laucnh | error
     */
    getById(id: string) {
        return http.get(`${this.resourcePath}/${id}`);
    }

    /**
     * get all launches 
     * @returns Promise<any> | launches | error
     */
    getAll() {
        return http.get(this.resourcePath);
    }
}

export default new LaunchDataService();