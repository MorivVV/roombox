<template>
  <div id="billing">
        <div class="bil-line head"><div class="onebill">Счетчик</div><div class="onebill">Услуга</div><div class="onebill">Было</div><div class="onebill">Стало</div><div class="onebill">Расход</div><div class="onebill">Цена</div><div class="onebill">Сумма</div></div>
        <div v-for="nam in bill" :key="nam.KOD_METER" class="bil-line">
            <div class="onebill" v-html="nam.meter"></div>
            <div class="onebill" v-html="nam.res"></div>
            <div class="onebill" :title="'от ' + nam.DATEBIL.substr(0,10)" v-html="nam.LAST_BIL"></div>
            <div class="onebill" :id="nam.KOD_METER" :title="'от ' + nam.dbil.substr(0,10)" contenteditable="true" @blur="nam.BILLING=+$event.target.innerText" v-html="nam.POST==0 && nam.BILLING !== null ? nam.LAST_BIL : nam.BILLING"></div>
            <div class="onebill" v-html="+nam.POST==0 && nam.BILLING !== null ? nam.BILLING : +nam.BILLING - +nam.LAST_BIL"></div>
            <div class="onebill" :title="'от ' + nam.DATE_RES.substr(0,10)" v-html="nam.cena"></div>
            <div class="onebill" v-html="((+nam.POST==0 && nam.BILLING !== null ? +nam.BILLING : +nam.BILLING - +nam.LAST_BIL)*+nam.cena).toFixed(2)"></div>
        </div>
        <div class="bil-line head">
            <div class="onebill" >Итоги</div>
            <div class="onebill" >{{ bill.reduce(function(sum, nam) {return sum + +(+nam.POST==0 && nam.BILLING !== null ? +nam.BILLING : +nam.BILLING - +nam.LAST_BIL)*+nam.cena}, 0).toFixed(2) }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data: ()=> ({
        bill: JSON.parse('[{"meter":"Водоотведение","res":"Водоотведение","KOD_METER":"9","dbil":"2018-08-22 00:00:00","LAST_BIL":"235","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2018-07-01 00:00:00","BILLING":"242","POST":"1","ON_METER":"0","ON_PEOPLE":"0","cena":"14.74"},{"meter":"Вывоз КГМ","res":"Вывоз КГМ","KOD_METER":"25","dbil":"2018-08-22 00:00:00","LAST_BIL":"2","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2017-07-01 00:00:00","BILLING":"2","POST":"0","ON_METER":"0","ON_PEOPLE":"1","cena":"9.57"},{"meter":"Газ","res":"Газ с котлом","KOD_METER":"2","dbil":"2018-08-22 00:00:00","LAST_BIL":"4100","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2018-07-01 00:00:00","BILLING":"4118","POST":"1","ON_METER":"0","ON_PEOPLE":"0","cena":"5.2"},{"meter":"Интерент","res":"Интернет Эверест","KOD_METER":"20","dbil":"2018-08-22 00:00:00","LAST_BIL":"1","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2017-07-01 00:00:00","BILLING":"1","POST":"0","ON_METER":"0","ON_PEOPLE":"0","cena":"490"},{"meter":"Кабельное телек","res":"Кабельное телевидени","KOD_METER":"29","dbil":"2018-08-22 00:00:00","LAST_BIL":"1","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2017-03-01 00:00:00","BILLING":"1","POST":"0","ON_METER":"0","ON_PEOPLE":"0","cena":"220"},{"meter":"Содержание жилья","res":"Содержание жилья","KOD_METER":"23","dbil":"2018-08-22 00:00:00","LAST_BIL":"30.5","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2017-11-01 00:00:00","BILLING":"30.5","POST":"0","ON_METER":"1","ON_PEOPLE":"0","cena":"14.84"},{"meter":"ТO ВДГО газ","res":"ТO ВДГО газ","KOD_METER":"11","dbil":"2018-08-22 00:00:00","LAST_BIL":"1","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2017-07-01 00:00:00","BILLING":"1","POST":"0","ON_METER":"0","ON_PEOPLE":"0","cena":"305.05"},{"meter":"ТО ВДГО вода","res":"ТО ВДГО вода","KOD_METER":"27","dbil":"2018-08-22 00:00:00","LAST_BIL":"30.5","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2017-11-01 00:00:00","BILLING":"30.5","POST":"0","ON_METER":"1","ON_PEOPLE":"0","cena":"0.78"},{"meter":"Уборка снега","res":"Уборка снега","KOD_METER":"26","dbil":"2018-08-22 00:00:00","LAST_BIL":"30.5","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2018-04-01 00:00:00","BILLING":"30.5","POST":"0","ON_METER":"1","ON_PEOPLE":"0","cena":"0"},{"meter":"Холодная вода","res":"Холодная вода","KOD_METER":"4","dbil":"2018-08-22 00:00:00","LAST_BIL":"235","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2018-07-01 00:00:00","BILLING":"242","POST":"1","ON_METER":"0","ON_PEOPLE":"0","cena":"27.74"},{"meter":"Электроэнергия","res":"Электроэнергия","KOD_METER":"1","dbil":"2018-08-22 00:00:00","LAST_BIL":"4738","DATEBIL":"2018-07-22 00:00:00","DATE_RES":"2018-07-01 00:00:00","BILLING":"4815","POST":"1","ON_METER":"0","ON_PEOPLE":"0","cena":"4"}]')
    })
}
</script>

<style scoped>
.bil-line {
    display: flex;
    flex-wrap: wrap;
    background: appworkspace;
    border: 1px solid #00008B;
    border-radius: 5px;
    margin-top: 1px;
}
.head{
    display: flex;
    text-align: center;
    background:purple;
    color: lightyellow;
    font-weight: bold;
    text-shadow: none;
}
.head .onebill {
    background:purple;
}
.bil-line:nth-child(2n){
    background: azure;
}
.bil-line:focus-within{
    background: lemonchiffon;
    border: 1px solid yellow;
}
.onebill{
    padding: 1px;
    border: 1px solid #0000FF;
    flex-grow: 1;
    flex-basis: 60px;
    text-align: end;
}
.onebill:nth-child(-n+2){
    flex-basis: 150px;
}
div.onebill[contenteditable=true]{
    background: #e2ffe2;
    font-weight: bold;
}
</style>