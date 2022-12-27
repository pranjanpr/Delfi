if(typeof init == 'undefined'){


const toPromise = async (callback) => {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    });
    return promise;
}

const getData = async (url) => {
    return toPromise((resolve, reject) => {
        chrome.storage.local.get([url], (result) => {
            //console.log(result)
            if (chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            //console.log(result);
            //console.log(result[url]);
            //const researches = result.pages ?? [];
            //console.log(researches);
            //resolve(researches);
            resolve(result[url] ? result[url] : []);
        });
    });
};

const saveNewData = async (url, name, dataText) => {

    //const pages = await getData(url);
    //const updatedPages = [...pages, { url, name }];

    const newData = {
        'name' : name,
        'dataText' : dataText
    };

    return toPromise((resolve, reject) => {
        //chrome.storage.local.set({ [url]: updatedPages }, () => {  
        chrome.storage.local.set({ [url]: newData}, () => {           
            if (chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            resolve(newData);
        });
    });
};


// const clearData = () => {
//     return toPromise((resolve, reject) => {
//         chrome.storage.local.remove([PAGES_KEY], () => {
//             if (chrome.runtime.lastError)
//                 reject(chrome.runtime.lastError);
//             resolve();
//         });
//     });
// };

const removeDatapoint = async (url) =>{
    return toPromise((resolve, reject) => {
        chrome.storage.local.remove([url], (result) => {
            //console.log(result);
            if (chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            resolve();
          });
    });
};


const allDatapoint = async () =>{
    return toPromise((resolve, reject) => {
        chrome.storage.local.get(null, (items)=>{
            var allKeys = Object.keys(items);
            //console.log(items);

            // for (const key in items) {
            //     if (items.hasOwnProperty(key)) {
            //         //console.log(`${key}: ${items[key]}`);
            //         //works
            //         console.log(items[key].name);
            //     }
            // }

            if (chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            resolve(items);
        });
    });
};


// const fetchData = async (url) =>{
//     return toPromise((resolve, reject) => {
//         chrome.storage.local.get([url], (result) => {
//             //console.log(result)
//             if (chrome.runtime.lastError)
//                 reject(chrome.runtime.lastError);
            
//             // for (const [key, val] of Object.entries(result)) {
//             //         // do something
//             //     console.log(key);
//             //     console.log(val);
//             //     for (let dataPoint in val){
//             //         console.log(val.0);
//             //     }
//             // }

//             const researches = result.pages ?? [];
//             //console.log(researches);
//             //var result = result.url.filter(function(e){return e.code == url})
//             //console.log(result);
//             resolve(result);
//         });
//     });
// }


(async function(){


const Lname = document.querySelector("h1");
//console.log(Lname);

if (Lname) {
    const text = Lname.textContent;
    //console.log(text);

    const newName = document.createElement("p");
    newName.classList.add("pratyush-custom-newname");
    newName.textContent = `${text}`;

    //create button for action
    button = document.createElement("button");
    button.textContent = "Save";
    button.classList.add("save-profile-button");

    textbox = document.createElement('input');
    textbox.type = 'text/css';
    textbox.className = "add-keywords-to-save";
    textbox.textContent = "Add";

    //check if data exists
    //check tablink in the already stored data as it is unique
    //if the data is already present then button color would be blue
    //else button color would be grey
    
    tabLink = window.location.toString();

    //foo(tabLink, text);
    //console.log("stage1");
    const isPresent = await getData(tabLink);
   
    //console.log(isPresent.name);

    //const isPresent = await getData(tabLink);

    if(isPresent.name === text){
        //if the datapoint already exists
        //highlight the tab
        //console.log("Saved Name == Current Name")
        button.classList.add("highlight");
        textbox.placeholder = isPresent.dataText;
    }else{
        //do nothing
    }

    button.onclick = async function (e) {
        //e.stopPropagation();
        if (button.classList.contains("highlight")) {
            //console.log("stage2");
            //await removeDatapoint(text);
            //clearData();
            //console.log("Data Removed!");
            //remove the data from the database
            await removeDatapoint(tabLink);
            await getData(tabLink);
            await allDatapoint();
            //await removeDatapoint(tabLink);
            textbox.value = "";
            textbox.placeholder = "";
            button.classList.remove("highlight");
            
        } else {
            //console.log("stage3");
            //console.log(textbox.value);
            //add the data to the database
            await saveNewData(tabLink, text, textbox.value);
            await getData(tabLink);
            //await saveNewData(url, text);
            textbox.placeholder = textbox.value;
            button.classList.add("highlight");
            
        }
      };

    var titleContent = document.querySelector(".ph5");
    //console.log(titleContent);
    
    //since this code would run once the DOM updates, we need to remove the last button first
    //other wise the buttons would keep stacking
    titleContent.removeChild(titleContent.lastChild);
    titleContent.appendChild(button);

    document.querySelector(".pv-top-card-v2-ctas").removeChild(document.querySelector(".pv-top-card-v2-ctas").lastChild);
    document.querySelector(".pv-top-card-v2-ctas").appendChild(textbox);
}
})();
}