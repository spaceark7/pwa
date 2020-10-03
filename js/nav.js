document.addEventListener("DOMContentLoaded", function () {
  // Aktivasi Nav Bar

  var elements = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elements);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Memuat daftar tautan menu

        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Mendaftarkan listener untuk setiap menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              console.log("Executed registering");
              //Tutup menu sidebar
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              //Muat Konten Halaman yg dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };

    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Memuat konten Halaman
  var page = window.location.hash.substr(1);
  console.log(page);
  if (page == "") {
    page = "home";
  }
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Konten Tidak Dapat Ditemukan </p>";
        } else {
          content.innerHTML = "<p>Uppss.... Halaman tidak dapat diakses</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
