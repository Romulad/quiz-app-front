import { baseUrl } from "./config";



export const writeText = (ref, inter) =>{
    let textToWrite = ref.current.textContent;
    ref.current.textContent = "";

    let i = 0;
    let int = setInterval(() => {
        if(i<textToWrite.length){
            ref.current.textContent += textToWrite[i]
            i++
        }else{
            clearInterval(int);
            return true
        }
    }, inter);
    
};

export const countNumber = (num, ref, inter, end="") =>{
    ref.current.textContent = "";

    let i = 0
    let int = setInterval(() => {
        if(i <= num){   
            ref.current.textContent = i++;
        }else{
            if(end){
                ref.current.textContent += end 
            }
            clearInterval(int)
        }
    }, inter);
};

export async function getRequest(path){
    const respon = await fetch(
        `${baseUrl}/${path}`,
    );
    
    const content = await respon.text();
    const status = respon.status;

    return [content, status];
};

export async function getAllCategory(){
    const [content, status] = await getRequest('all-categories/');
    if(status === 200){
        const resp = JSON.parse(content);
        return resp.categories;
    }else{
        return undefined;
    }    
};

export async function getAllquiz(){
    const [content, status] = await getRequest('all-quizs/');
    
    if(status === 200){
        const resp = JSON.parse(content);
        return resp.quizs;
    }else{
        return undefined;
    }    
};

export async function getQuizData(
    quiz_title, lang, level
){
    const [content, status] = await getRequest(`quiz/${quiz_title}/${lang}/${level}/`);
    
    if(status === 200){
        const resp = JSON.parse(content);
        return resp[level];
    }else{
        return undefined;
    }    
};

export async function getQuizCategory(title){
    const [content, status] = await getRequest(`category-name/${title}/`);
    
    if(status === 200){
        const resp = JSON.parse(content);
        return resp.name;
    }else{
        return undefined;
    }   

}