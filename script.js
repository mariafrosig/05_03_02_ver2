        let retter = [];
        let filter = "alle";
        document.addEventListener("DOMContentLoaded", start);

        function start() {
            console.log("hej");

            let dest = document.querySelector("#menu_div");

            async function getJson() {
                let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php? id=1rgt-fgGf13AV6Wwyl9ONuMDEQUqzYmqNTxPTg8lcnSY");
                retter = await jsonData.json();
                visRet();
            }

            function visRet() {
                console.log(retter);

                dest.innerHTML = "";
                retter.forEach(retter => {
                    if (filter == "alle" || filter == retter.kategori) {


                        let template =
                            `<div class="vis">

                            <div>
<img src="imgs/${retter.billede}.jpg">
                            </div>
                            <div>
                            <h2>${retter.navn}</h2>
                            </div>
                            </div>`;



                        dest.insertAdjacentHTML("beforeend", template);
                        dest.lastElementChild.addEventListener("click", åbn);

                        function åbn() {
                            document.querySelector("#indhold").innerHTML = `<div class="vis">
                            <div>
<img src="imgs/${retter.billede}.jpg">
                            </div>
                            <div>
                            <h2>${retter.navn}</h2>
                            <p> ${retter.lang}</p>
                            <p> <b> ${retter.pris} kr.</b></p>
                            </div>
                            </div>`

                            document.querySelector("#popup").style.display = "block";

                        }

                    }
                })


                document.querySelector("#luk button").addEventListener("click", () => {
                    document.querySelector("#popup").style.display = "none";
                })

            }

            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtering);
            })




            function filtering() {
                console.log("filtrering");
                filter = this.getAttribute("data-hold");
                document.querySelectorAll(".filter").forEach(elm => {
                    elm.classList.remove("valgt");
                })
                this.classList.add("valgt");
                visRet();
            }
            getJson();
        }
