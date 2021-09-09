menuOpened = false
      function updateMenuStatus(actualStatus){
        let menu = document.getElementById("menu")
        !menuOpened
        ? menu.setAttribute("style", `left:${495 - menu.scrollWidth}px;`)
        : menu.setAttribute("style", `left:${495}px;`)

        menuOpened = !menuOpened
      }

      function selectThisMenuItem(menuIndex){
        const menuItems = [...document.getElementsByClassName("menu-item")]
        menuItems.forEach((element, index) => {
          menuIndex == index
          ? element.className = "menu-item active"
          : element.className = "menu-item" 
        });
      }

      Element.prototype.setThisIndexActive = function(){
        selectThisMenuItem(this.getAttribute("menu-item-index"))
      }