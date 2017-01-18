const platforms = {
    mac: ['10.7', '10.10', '10.11', '10.12'],
    win: ['3.1', '95', '1997', '98', '2000', 'XP', 'Vista', '7', '8', '8.1', '10'],
    ios: ['2.0', '3.0', '3.2', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0']
  },
  rawTemplate = document.getElementById('tableData').innerHTML,
  template = _.template(rawTemplate),
  platformCheckboxes = document.getElementsByClassName('platformCheckbox');

var data = { fonts: fonts };

platformCheckboxes.mac.addEventListener('change', renderTable);
platformCheckboxes.win.addEventListener('change', renderTable);
platformCheckboxes.ios.addEventListener('change', renderTable);

function renderTable () {
  data = {
    fonts: fonts.filter((font) => {
      if (platformCheckboxes.mac.checked && !font.mac.length) {
        return false;
      }

      if (platformCheckboxes.win.checked && !font.win.length) {
        return false;
      }

      if (platformCheckboxes.ios.checked && !font.ios.length) {
        return false;
      }

      return true;
    })
  };

  document.getElementById('tableBody').innerHTML = template(data);
}

renderTable();
