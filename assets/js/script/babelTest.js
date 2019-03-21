function doStuff() {
  const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium',
    'Uranium'
  ];
  const data = materials.map(material => material.length + '<br>' + material + ' <br><hr>');
  const theDiv = document.getElementById('theDiv');
  theDiv.innerHTML = data;
}
document.addEventListener('DOMContentLoaded', function() {
  doStuff();
});