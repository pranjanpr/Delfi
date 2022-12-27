// // const article = document.querySelector("article");
// // console.log("jbdc");
// // // `document.querySelector` may return null if the selector doesn't match anything.
// // if (article) {
// //   const text = article.textContent;
// //   const wordMatchRegExp = /[^\s]+/g; // Regular expression
// //   const words = text.matchAll(wordMatchRegExp);
// //   // matchAll returns an iterator, convert to array to get word count
// //   const wordCount = [...words].length;
// //   const readingTime = Math.round(wordCount / 200);
// //   const badge = document.createElement("p");
// //   // Use the same styling as the publish information in an article's header
// //   badge.classList.add("color-secondary-text", "type--caption");
// //   badge.textContent = `⏱️ ${readingTime} min read`;

// //   // Support for API reference docs
// //   const heading = article.querySelector("h1");
// //   // Support for article docs with date
// //   const date = article.querySelector("time")?.parentNode;

// //   (date ?? heading).insertAdjacentElement("afterend", badge);
// // }
// const PAGES_KEY = 'pages';

// console.log(1);
// const Lname = document.querySelector("h1");
// console.log(Lname);

// const toPromise = (callback) => {
//     const promise = new Promise((resolve, reject) => {
//         try {
//             callback(resolve, reject);
//         }
//         catch (err) {
//             reject(err);
//         }
//     });
//     return promise;
// }

// const getData = () => {
//     return toPromise((resolve, reject) => {
//         chrome.storage.local.get([PAGES_KEY], (result) => {
//             //console.log(result)
//             if (chrome.runtime.lastError)
//                 reject(chrome.runtime.lastError);

//             const researches = result.pages ?? [];
//             resolve(researches);
//             console.log(researches);
//         });
//     });
// };

// const saveNewData = async (name, url) => {
//     const pages = await getData();
//     const updatedPages = [...pages, { name, url }];

//     return toPromise((resolve, reject) => {

//         chrome.storage.local.set({ [PAGES_KEY]: updatedPages }, () => {           
//             if (chrome.runtime.lastError)
//                 reject(chrome.runtime.lastError);
//             resolve(updatedPages);
//         });
//     });
// };

// const clearData = () => {
//     return toPromise((resolve, reject) => {
//         chrome.storage.local.remove([PAGES_KEY], () => {
//             if (chrome.runtime.lastError)
//                 reject(chrome.runtime.lastError);
//             resolve();
//         });
//     });
// };

// const removeDatapoint = async (name) =>{
//     return toPromise((resolve, reject) => {
//         chrome.storage.local.remove([`${name}`], (result) => {
//             console.log(result);
//             if (chrome.runtime.lastError)
//                 reject(chrome.runtime.lastError);
//             resolve();
//           });
//     });
// };


// if (Lname) {
//     const text = Lname.textContent;
//     console.log(text);
//     const newName = document.createElement("p");
//     newName.classList.add("pratyush-custom-newname");
//     newName.textContent = `${text}`;
//     button = document.createElement("button");
//     button.textContent = "Save";
//     button.classList.add("save-profile-button");

//     button.onclick = async function (e) {
//        // console.log(e);
//         e.stopPropagation();
//         if (button.classList.contains("highlight")) {
//             //await removeDatapoint(text);

//             clearData();
//             console.log("Data Removed!");
//             await getData();
//             button.classList.remove("highlight");
//         } else {
//             tabLink = window.location.toString();
//             await saveNewData(text, tabLink);
//             button.classList.add("highlight");
//         }
//       };

//     Lname.insertAdjacentElement("afterend", newName);
//     Lname.insertAdjacentElement("afterend", button);
// }
