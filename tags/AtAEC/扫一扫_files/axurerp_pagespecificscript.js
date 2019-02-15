for(var i = 0; i < 15; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

});
document.getElementById('u13_img').tabIndex = 0;

u13.style.cursor = 'pointer';
$axure.eventManager.click('u13', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('概览.html');

}
});
gv_vAlignTable['u12'] = 'center';gv_vAlignTable['u10'] = 'top';gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u14'] = 'center';