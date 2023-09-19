fetch('menu.json')
  .then(response => response.json())
  .then(response => Object.values(response).forEach((e) => {
    let menuItem = document.createElement('li');
    menuItem.classList.add('menu-item');

    let menuItemA = document.createElement('a');
    menuItemA.href = e.url;
    menuItemA.textContent = e.name;
    menuItem.append(menuItemA);

    const menuCoverSelector = document.querySelector('.menu-ul');
    menuCoverSelector.appendChild(menuItem)

    if (e.subMenu) {
      menuItemA.classList.add('has-child');
      checkSubMenu(e, menuItem);
    }

    function checkSubMenu(e, menuCover) {

      let subMenuCover = document.createElement('ul');
      subMenuCover.classList.add('sub-menu-cover');
      console.log(menuCover);

      menuCover.appendChild(subMenuCover);

      if (e.subMenu) {
        Object.values(e.subMenu).forEach((i) => {

          let subMenuItem = document.createElement('li');

          let subMenuItemA = document.createElement('a');

          function makeSubMenuContent(e, menuCover, menuItem, menuItemA) {
            if (!menuItem) {
              let menuItem = document.createElement('li');
            }
            if (!menuItemA) {
              let MenuItemA = document.createElement('a');
            }
            menuCover.appendChild(menuItem);

            menuItemA.href = e.url;
            menuItemA.textContent = e.name;

            menuItem.appendChild(menuItemA);
          }

          makeSubMenuContent(i, subMenuCover, subMenuItem, subMenuItemA);

          if (i.subMenu) {
            subMenuItemA.classList.add('has-child');
            let subMenuCover = document.createElement('ul');
            subMenuCover.classList.add('sub-menu-cover');

            checkSubMenu(i, subMenuItem)
          }

        })
      }
    };
  })
  )
  .then(() => {
    
    const menuSelector = document.querySelectorAll('.has-child');
    const menuArray = Array.from(menuSelector);
    for (let i = 0; i < menuArray.length; i++) {
      menuArray[i].addEventListener('click', (i) => {
        i.preventDefault();
        i.target.nextElementSibling.classList.toggle('show');
      });
    }
  })



