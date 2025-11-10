<script>
// js/analytics.js (인라인 버전)
window.ABTest = (function(){
const KEY = 'ab_variant';
function getVariant(){ return localStorage.getItem(KEY) || 'A'; }
function setUserProp(){
if (window.gtag) {
gtag('set', 'user_properties', { ab_variant: getVariant() });
}
}
function trackCTA(label){
if (!window.gtag) return;
gtag('event', 'cta_click', {
event_category: 'engagement',
event_label: label || 'primary',
ab_variant: getVariant(),
value: 1
});
}
return { getVariant, setUserProp, trackCTA };
})();
</script>