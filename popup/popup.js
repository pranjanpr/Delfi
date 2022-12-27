// const tabs = await chrome.tabs.query({
//     url: [
//       "https://developer.chrome.com/docs/webstore/*",
//       "https://developer.chrome.com/docs/extensions/*",
//     ],
//   });
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

// const sendMessageToBackend = async ()=>{
//   console.log("sending message to bkg");
//   return toPromise((resolve, reject)=>{
//     chrome.runtime.sendMessage({greeting: "GetURL"}, (response) => { 
//       console.log(response);
//       if(chrome.runtime.lastError)
//         reject(chrome.runtime.lastError);

//       resolve();
//     });
//   })
// }

const items = await allDatapoint();
// const collator = new Intl.Collator();
// tabs.sort((a, b) => collator.compare(a.title, b.title));

 const template = document.getElementById("li_template");
 const elements = new Set();

 for (const key in items){
  if (items.hasOwnProperty(key)) {

  //console.log(key);
  const element = template.content.firstElementChild.cloneNode(true);
  const title = items[key].name;
  const pathname = key;
  const savedData = items[key].dataText;

  element.querySelector(".title").textContent = title;
  //element.querySelector(".pathname").textContent = pathname;
  element.querySelector(".set-link-here").setAttribute('href', pathname);
  element.querySelector(".keywords-saved").textContent = savedData;

  element.querySelector(".removeProfile").addEventListener("click", async () => {
    // need to focus window as well as the active tab
        //await sendMessageToBackend();

        return await toPromise( async (resolve, reject) => {

         // console.log(key);
          element.classList.add("removedProfileNode");
          chrome.storage.local.remove([key], (result) => {
            if (chrome.runtime.lastError)
                reject(chrome.runtime.lastError);   
            resolve();
          });
    });
  });
  elements.add(element);
  }
 }


 document.querySelector("ul").append(...elements);
// for (const tab of tabs) {
//   const element = template.content.firstElementChild.cloneNode(true);

//   const title = tab.title.split("-")[0].trim();
//   const pathname = new URL(tab.url).pathname.slice("/docs".length);

//   element.querySelector(".title").textContent = title;
//   element.querySelector(".pathname").textContent = pathname;
//   element.querySelector("a").addEventListener("click", async () => {
//     // need to focus window as well as the active tab
//     await chrome.tabs.update(tab.id, { active: true });
//     await chrome.windows.update(tab.windowId, { focused: true });
//   });

//   elements.add(element);
// }
// document.querySelector("ul").append(...elements);

// const button = document.querySelector("button");
// button.addEventListener("click", async () => {
//   const tabIds = tabs.map(({ id }) => id);
//   const group = await chrome.tabs.group({ tabIds });
//   await chrome.tabGroups.update(group, { title: "DOCS" });
// });