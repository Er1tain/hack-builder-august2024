import { Preferences } from "@capacitor/preferences";
import { getPlatforms, LifeCycleCallback } from "@ionic/react";
import axios from "axios";

export class AuthController {
    static async Reg(_first_name: string, _surname: string, _second_name:string, _email: string, _password: string, _role: boolean) {
        const query = await axios.post("http://localhost:8000/api/auth/register",
            {
                first_name: _first_name, surname: _surname,
                second_name: _second_name, password: _password, role: _role, email: _email
            },
            {
                headers: {"Access-Control-Allow-Origin": "*"},
            }
        );
        try {
            const data: RegResp = await query.data;
            console.log(data);

            //Сохраняем апи-ключ локально
            await Preferences.set({
                key: 'api_key',
                value: data.api_key
            })
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async login(email: string, password: string) {
        const query = await axios.post("http://localhost:8000/api/auth/login",
            {
                email: email, password: password
            },
            {
                headers: {"Access-Control-Allow-Origin": "*"},
            }
        );
        try {
            const data = await query.data;
            console.log(data);

            //Сохраняем апи-ключ локально
            await Preferences.set({
                key: 'api_key',
                value: data.api_key
            })
            return data;

        } catch(error) {
            alert("Ошибка в ответе");
        }
    }
}

export class ClientController {
    static async getMe() {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.get("http://localhost:8000/api/client/me",
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "api-key": apiKey
            },
        }
        );
        try {
            const data = await query.data;
            console.log(data);
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }

    }

    static async putMe(firstName: string, surname: string, secondName: string, email: string, gradeUp: number, phoneNumber: string, aboutMe: string) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.put("http://localhost:8000/api/client/me",
        {
            first_name: firstName, surname: surname, second_name: secondName, email: email, grade_up: gradeUp, phone_number: phoneNumber, about_me: aboutMe
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "api-key": apiKey
            },
        }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async postProfession(profession_id: number) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.post(`http://localhost:8000/api/client/profession/${profession_id}`,
            {},
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async deleteProfession(profession_id: number) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.delete(`http://localhost:8000/api/client/profession/${profession_id}`,
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async getFeedObjects() {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.get(`http://localhost:8000/api/client/feed/object-construction`,
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async postGetWork(objectId: number) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.post(`http://localhost:8000/api/client/get_work/${objectId}`,
            {},
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            return data;
            console.log(data);
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async deleteWork(objectId: number) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.delete(`http://localhost:8000/api/client/delete_work/${objectId}`,
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            console.log(data);
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }
    static async putGradeUp() {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.put(`http://localhost:8000/api/client/level-up/`,
            {},
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            console.log(data);
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }
}

export class CustomerController {
    static async getMe() {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.get("http://localhost:8000/api/customer/me",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "api-key": apiKey
                },
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }

    }

    static async getObjectInfo(objectId: number) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.get(`http://localhost:8000/api/customer/info/object-construction/${objectId}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "api-key": apiKey
                },
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async createObject(workName: string, workDescription: string, price: number, availableVacancies: number, professions: any) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.post("http://localhost:8000/api/customer/new/object-construction",
            {
                work_name: workName, work_description: workDescription, price: price, 
                available_vacancies: availableVacancies, 
                professions: professions.map((profession: any) => { return {id: profession.id, profession_name: profession.professionName} })
            },
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }

    static async deleteObject(objectId: number) {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.delete(`http://localhost:8000/api/customer/delete/object-construction/${objectId}`,
            {
                headers: {"Access-Control-Allow-Origin": "*", "api-key": apiKey},
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }
}

export class ProfessionController {
    static async getAll() {
        const apiKey = (await Preferences.get({key: "api_key"})).value;
        const query = await axios.get("http://localhost:8000/api/profession/all",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "api-key": apiKey
                },
            }
        );
        try {
            const data = await query.data;
            return data;
        } catch(error) {
            alert("Ошибка в ответе");
        }
    }
}