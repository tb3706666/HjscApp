for(var i = 0; i < 3; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

});

$axure.eventManager.mouseover('u0', function(e) {
if (!IsTrueMouseOver('u0',e)) return;
if (true) {
function waitu0ec448fbb4524dc58e532c9cbe382e8c1() {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('引导页3.html');
}
setTimeout(waitu0ec448fbb4524dc58e532c9cbe382e8c1, 1000);

}
});
gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u2'] = 'top';