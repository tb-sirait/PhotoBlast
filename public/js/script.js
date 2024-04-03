const packages = document.querySelectorAll(".package");
const confirmedButton = document.querySelectorAll("a.confirmed");

// var targetPackage, targetButton;

// function removeTarget() {
//     targetPackage.style.width = "";
//     targetPackage.style.height = "";
//     targetPackage.classList.remove("pop-animation");
//     targetPackage = null;

//     targetButton.style.background = "linear-gradient(0deg, #f5dd61, #f5dd61)";
//     targetButton.style.color = "rgba(244, 83, 138, 1)";
//     targetButton.textContent = "Choose ->";
//     targetButton = null;
// }

// document.addEventListener("click", (event) => {
//     if (targetPackage && !event.target.closest(".package")) {
//         removeTarget();
//     }
// });

// confirmedButton.forEach(function (button) {
//     button.addEventListener("click", (event) => {
//         const package = event.currentTarget.parentNode;
//         const addData = package.querySelector(".package-confirmed");
//         addData.innerHTML += `<div class="instruction-content">
//                                 <h1>instruction</h1>
//                                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi fugit soluta ipsa dignissimos quam excepturi earum deleniti minima illum ea assumenda debitis, animi voluptate eaque totam sed culpa. Culpa, nihil incidunt. Officia modi facere enim et recusandae debitis dicta odio amet autem dolore itaque magni, inventore nostrum. Numquam, doloribus impedit!</p>
//                               </div>`;
//         const packageSiblings = package.parentNode;
//         const siblings = Array.from(packageSiblings.children);
//         siblings.forEach((sibling) => {
//             if (sibling !== package) {
//                 sibling.style.display = "none";
//             }
//         });
//         console.log(package);
//     });
// });
