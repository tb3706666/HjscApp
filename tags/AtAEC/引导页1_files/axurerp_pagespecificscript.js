for(var i = 0; i < 3; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

});

$axure.eventManager.mouseover('u0', function(e) {
if (!IsTrueMouseOver('u0',e)) return;
if (true) {
function waitu6837d77f7f2b4001a0eaf161e8d540a11() {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('引导页2.html');
}
setTimeout(waitu6837d77f7f2b4001a0eaf161e8d540a11, 1000);

}
});
gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u2'] = 'top';