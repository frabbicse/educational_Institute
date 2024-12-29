import axios, { AxiosResponse } from 'axios';
import { IDepartment } from '../application/models/department';
import { IUserFormValues, IUser } from '../application/models/user';
// import { history } from '..';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { createBrowserHistory } from 'history';
import { ICourse } from '../application/models/course';
import { ISemester } from '../application/models/semester';
import { IDesignation } from '../application/models/designation';
import { promises } from 'dns';
import { ITeacher } from '../application/models/teacher';
import { ICourseAssignToTeacher } from '../application/models/courseAssign';
import { IStudent } from '../application/models/student';
export const history = createBrowserHistory();

axios.defaults.baseURL = 'https://localhost:44318/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})


axios.interceptors.response.use(undefined, error => {

    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error - make sure api is running');
    }

    const { status, config, data } = error.response;
    if (status === 404) {
        history.push('/notfound');
    }
    if (status === 400 && config.method === 'get' && data.undefined) {
        history.push('/notfound');
    }
    if (status === 401) {
        toast.error("You are not authorized.");
    }
    if (status === 500) {
        toast.error("Server error - consult with vendor");
    }
    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response)));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Departments = {
    list: (): Promise<IDepartment[]> => requests.get('/department'),
    detail: (id: number) => {
        requests.get(`/department/${id}`)
    },
    create: (department: IDepartment) => requests.post('/department', department),
    update: (department: IDepartment) => requests.put(`/department/${department.departmentId}`, department),
    delete: (id: number) => requests.delete(`/department/${id}`)
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
    currentState: (id: string): Promise<IUser> => requests.get(`/user/${id}`),
}


const Course = {
    list: (): Promise<ICourse[]> => requests.get('/course'),
    // detail: (id: number) => {
    //     requests.get(`/department/${id}`)
    // },
    create: (course: ICourse) => requests.post('/course', course),
    // update: (department: IDepartment) => requests.put(`/department/${department.departmentId}`, department),
    // delete: (id: number) => requests.delete(`/department/${id}`)
};


const Semester = {
    list: (): Promise<ISemester[]> => requests.get('/semester'),
    create: (semester: ISemester): Promise<ISemester> => requests.post('/semester', semester)
}

const Designation = {
    list: (): Promise<IDesignation[]> => requests.get('/designation'),
}

const Teacher = {
    list: (): Promise<ITeacher[]> => requests.get('/teacher'),
    create: (teacher: ITeacher): Promise<ITeacher> => requests.post('/teacher', teacher)
}

const CourseAssignToTeacher = {
    list: (): Promise<ICourseAssignToTeacher[]> => requests.get('/courseAssign'),
    create: (courseAssign: ICourseAssignToTeacher): Promise<ITeacher> => requests.post('/courseAssign', courseAssign)
}

const Student = {
    list: (): Promise<IStudent[]> => requests.get('/student'),
    create: (student: IStudent): Promise<ITeacher> => requests.post('/student', student)
}

export default {
    Departments, User, Course, Semester, Designation, Teacher, CourseAssignToTeacher, Student
} 