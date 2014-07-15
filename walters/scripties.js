function changeMenuBar() {
	if(document.getElementById('navbar').classList.contains("numberinput")) {
    document.getElementById('navbar').classList.remove('numberinput');
	document.getElementById('navbar').classList.add('numberinput2');
} else if(document.getElementById('navbar').classList.contains("numberinput2")) {
    document.getElementById('navbar').classList.remove('numberinput2');
	document.getElementById('navbar').classList.add('numberinput');
}
}