<template>
  <b-container>
    <div class="page-header">
      <h2 class="text-center">Game Manager</h2>
      <hr>
    </div>
    <b-row>
      <b-col lg="4">
        <b-form v-on:submit.prevent="onSubmit()">

          <b-form-group label="Titolo" label-for="titolo">
            <b-form-input type="text" id="titolo" v-model="newGame.Titolo" v-on:change="onChange()"/>
          </b-form-group>

          <b-form-group label="SoftwareHouse" label-for="softwareHouse">
            <b-form-input type="text" id="softwareHouse" v-model="newGame.SoftwareHouse" v-on:change="onChange()"/>
          </b-form-group>

          <b-form-group label="Tipo" label-for="tipo">
            <b-form-select id="tipo" name="tipo" v-model="newGame.Tipo" :options="gameTypes">
            </b-form-select>
          </b-form-group>

          <b-form-group label="Piattaforma" label-for="piattaforma">
            <b-form-select id="piattaforma" name="piattaforma" v-model="newGame.Piattaforma" :options="gamePlatforms">
            </b-form-select>
          </b-form-group>

          <b-btn type="submit" variant="primary" :disabled="submitIsDisabled">Aggiungi</b-btn>

        </b-form>
        <br>
      </b-col>

      <b-col lg="8">
        <b-table striped hover :items='Games' :fields='fields'>
          <template v-slot:cell(Tipo)="data">{{getTypes(data.item.Tipo)}}</template>
          <!-- <template v-slot:cell(Piattaforma)="data">{{getPlatform(data.item.Piattaforma)}}</template> -->
          <template v-slot:cell(Piattaforma)="data">
            <img :src="getPlatformImage(data.item.Piattaforma)" width="52">
          </template>
          
          <template v-slot:cell(Operazioni)="data">
            <b-btn size="sm" variant="danger" @click="onDelete(data.item)">X</b-btn>&nbsp;
            <b-btn size="sm" variant="warning" @click="onEdit(data.item)" v-b-modal.editGameModal>M</b-btn>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal id="editGameModal" title="Modifica Game" @ok="onUpdate()">
      <b-form-group label="Titolo" label-for="titolo">
            <b-form-input type="text" id="titolo" v-model="editGame.Titolo"/>
          </b-form-group>

          <b-form-group label="SoftwareHouse" label-for="softwareHouse">
            <b-form-input type="text" id="softwareHouse" v-model="editGame.SoftwareHouse"/>
          </b-form-group>

          <b-form-group label="Tipo" label-for="tipo">
            <b-form-select id="tipo" name="tipo" v-model="editGame.Tipo" :options="gameTypes">
            </b-form-select>
          </b-form-group>

          <b-form-group label="Piattaforma" label-for="piattaforma">
            <b-form-select id="piattaforma" name="piattaforma" v-model="editGame.Piattaforma" :options="gamePlatforms">
            </b-form-select>
          </b-form-group>
    </b-modal>

  </b-container>
</template>

<script>

import {gamesRef} from './firebase.js'
import {piattaFormaeNum, gamesTypeEnum} from './models/game.js'


export default {
  
  

  data() {
    return {
      gameTypes: gamesTypeEnum.properties,
      gamePlatforms: piattaFormaeNum.properties,
      fields: ['Titolo', 'SoftwareHouse', 'Tipo', 'Piattaforma', 'Operazioni'],
      Games:[],
      newGame:{
        Titolo: "",
        SoftwareHouse:"",
        Tipo: gamesTypeEnum.FPS,
        Piattaforma: piattaFormaeNum.PC
      },
      editGame: {},
      originKey: '',
      submitIsDisabled: true
    }
  },

  firebase: {
    Games: gamesRef
    
  },

  methods: {
    getPlatform(value){
      return this.gamePlatforms[value].text;
    },
    getTypes(value){
      
      return this.gameTypes[value].text;
      
    },
    
    onSubmit(){
      gamesRef.push(this.newGame);
      this.newGame.Titolo = "";
      this.newGame.SoftwareHouse = "";
      this.submitIsDisabled = true;
    },

    onChange(){
      this.submitIsDisabled = this.newGame.Titolo === "" || this.newGame.softwareHouse ==="";
    },

    onDelete(game){
      gamesRef.child(game['.key']).remove();
    },

    onEdit(game){
      this.originKey = game['.key'];
      this.editGame = {
        Titolo:game.Titolo,
        SoftwareHouse:game.SoftwareHouse,
        Tipo:game.Tipo,
        Piattaforma:game.Piattaforma
      };
    },

    onUpdate(){
      gamesRef.child(this.originKey).update(this.editGame);
    },

    getPlatformImage(value){
      return require('./assets/p_' + value + '.png' );
    }
    
  },

  


}


</script>

<style lang="scss">

.page-header{
  background-color: #226622;
  color: #ffff;
}
.page-header h2 {
  padding-top: 8px;
}

</style>
