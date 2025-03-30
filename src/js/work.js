const designContainerElement = document.getElementById("designContainer");
const categoryAllElement = document.getElementById("cat");
const categoryInElement = document.getElementById("catIn");
const categoryExElement = document.getElementById("catEx");
const categoryArElement = document.getElementById("catAr");
const inputElementSpeed = document.querySelector(".searchInputSpeed");




const AllDesign = [
    {
        dataIndex: 0,
        Name: "lorem1",
        Par: "interior",
        date: "2025",
        img: "./src/assets/images/designPhoto/interiordesoign2.jpg"
    },
    {
        dataIndex: 1,
        Name: "lorem2",
        Par: "exterior",
        date: "2025",
        img: "./src/assets/images/designPhoto/exteriordesign2.jpg"
    },
    {
        dataIndex: 2,
        Name: "lorem3",
        Par: "architectural",
        date: "2025",
        img: "./src/assets/images/designPhoto/architecturaldesign.jpg"
    },
    {
        dataIndex: 3,
        Name: "lorem1",
        Par: "interior",
        date: "2025",
        img: "./src/assets/images/designPhoto/interiordesoign2.jpg"
    },
    {
        dataIndex: 4,
        Name: "lorem2",
        Par: "exterior",
        date: "2025",
        img: "./src/assets/images/designPhoto/exteriordesign2.jpg"
    },
    {
        dataIndex: 5,
        Name: "lorem3",
        Par: "architectural",
        date: "2025",
        img: "./src/assets/images/designPhoto/architecturaldesign.jpg"
    }
];
document.addEventListener("DOMContentLoaded", function () {
    getDesign();
});

function getDesign(filterCategory = "all") {
    designContainerElement.innerHTML = "";
    let content = "";


    AllDesign.forEach(design => {
        const nameMatch = design.Name.toLowerCase().includes(inputElement.value.toLowerCase());
        const parMatch = design.Par.toLowerCase().includes(inputElement.value.toLowerCase());


        if ((filterCategory === "all" || design.Par === filterCategory) && (nameMatch || parMatch)) {
            content += `
                <div class="design_card">
                    <img src="${design.img}" alt="${design.Name}">
                    <div class="card_content">
                        <div class="card_content_title">
                            <h1>${design.Name}</h1>
                            <p>${design.date}</p>
                        </div>
                        <div class="card_content_body">
                            <p>${design.Par}</p>
                            <button data-index="${design.dataIndex || ''}" class="arrow-button btn11">
                                Ətraflı baxın<span class="arrow"></span>
                            </button>
                        </div>
                    </div>
                   <div class="card_content2">
                        <a class="link" href="https://www.instagram.com/oi_designstudio/" target="_blank">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a class="link" href="https://wa.me/994773111469?text=Salam. Bu dizayndan istəyirəm" target="_blank">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            `;
        }
    });

    designContainerElement.innerHTML = content;

    addButtonEventListeners();
}



categoryInElement.addEventListener("click", () => {
    getDesign("interior");
});

categoryExElement.addEventListener("click", () => {
    getDesign("exterior");
});

categoryArElement.addEventListener("click", () => {
    getDesign("architectural");
});

categoryAllElement.addEventListener("click", () => {
    getDesign("all");
});


// Butonlara tıklanarak detay sayfasına yönlendirme

function addButtonEventListeners() {
    const allButtons = document.querySelectorAll(".btn11");

    allButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");  // Butonun data-index özelliğini al

            const selectedDesign = AllDesign.find(data => data.dataIndex == index); // İlgili tasarımı bul

            if (selectedDesign) {
                // Tasarımı URL parametrelerine çevir
                const params = new URLSearchParams({
                    name: selectedDesign.Name,
                    par: selectedDesign.Par,
                    date: selectedDesign.date,
                    img: selectedDesign.img
                }).toString();

                // Detay sayfasına yönlendir
                window.location.href = `designPage.html?${params}`;
            } else {
                console.error("Belirtilen index için tasarım bulunamadı:", index);
            }
        });
    });
}



//*----------------search input design------------------- */
const searchBtnCL = document.querySelectorAll(".searchBtnCL");
console.log(searchBtnCL);
if (inputElementSpeed) {
    searchBtnCL.forEach(searchBtn => {
        searchBtn.addEventListener("click", () => {
            let searchText = inputElementSpeed.value.toLocaleLowerCase();
            const AllDesign = document.querySelectorAll(".design_card");
            let foundMatch = false;
            AllDesign.forEach(designElement => {
                let designText = designElement.textContent.toLocaleLowerCase();

                if (designText.includes(searchText)) {
                    designElement.style.display = "block";
                    foundMatch = true;
                } else {
                    designElement.style.display = "none";
                }
            });

            if (!foundMatch && searchText !== "") {
                alert("Bu axtarış tapılmadı!");
            }
        });
    })

} else {
    console.log("Bu axtarış tapılmadı!");
}


