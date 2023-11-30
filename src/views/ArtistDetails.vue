<template>
    <div v-if="artist">
      <form @submit.prevent="onSubmit" class="artist-form">
        <div class="mb-3">
          <label for="stageName" class="form-label fw-bold">Stage Name:</label>
          <input v-model="artist.stageName" type="text" class="form-control" id="stageName" />
          <div class="validation">{{ errors.stageName }}</div>
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label fw-bold">First Name:</label>
          <input v-model="artist.firstName" type="text" class="form-control" id="firstName" />
          <div class="validation">{{ errors.firstName }}</div>
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label fw-bold">Last Name:</label>
          <input v-model="artist.lastName" type="text" class="form-control" id="lastName" />
          <div class="validation">{{ errors.lastName }}</div>
        </div>
        <div class="mb-3">
          <label for="genre" class="form-label fw-bold">Genre:</label>
          <input v-model="artist.genre" type="genre" class="form-control" id="genre" />
          <div class="validation">{{ errors.genre }}</div>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-dark">Save</button>
          <button type="button" @click="$router.push({ name: 'Artists' })" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </template>

<script>
import {getArtistById, getAllRoles, updateArtist, insertArtist} from "@/api"

export default {
    props:["artistId"],
    data(){
        return{
            artist:null,
            roles:[],
            errors:{}
        }
    },
    mounted(){

        if(this.$route.name != "AddArtist" && isNaN(this.artistId)){
            this.$router.push({name:"NotFound"})
        }

        getAllRoles().then(roles => this.roles = roles);

        if(this.artistId > 0){
            getArtistById(this.artistId).then(artist => this.artist = artist).catch(err => this.$router.push({name:"NotFound"}));
        }else{
            // if the artistId prop was not passed in, then we are creating a new empty artist
            this.artist = {id:0, stageName:"", firstName:"", lastName:"", genre:""};
        }
    },
    methods:{
        onSubmit() {
            if(this.isValid()){
                if(this.artistId > 0){
                    updateArtist(this.artist).then(resp => {
                        this.$router.push({name: 'Artists'});
                    });
                }else{
                    insertArtist(this.artist).then(resp => this.$router.push({name: 'Artists'}));
                }
            }
        },
        isValid(){
            // if(!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password){
            //     return false;
            // }
            // return true;

            let valid = true;
            this.errors = {};

            if(this.artist.stageName == ""){
                this.errors.stageName = "ENTER STAGENAME";
                valid = false;
            }

            if(this.artist.firstName == ""){
                this.errors.firstName = "ENTER FIRST NAME";
                valid = false;
            }

            if(this.artist.lastName == ""){
                this.errors.lastName = "ENTER LAST NAME";
                valid = false;
            }

            if(this.artist.genre == ""){
                this.errors.genre = "ENTER GENRE";
                valid = false;
            }
            
            return valid;
        }
    }
}
</script>

<style scoped>
label{ 
    display: block; 
}
.validation{
    color: rgb(172, 16, 16); 
    font-weight: bold;
}

.artist-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 5px solid #000000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn-dark {
  background-color: #343a40;
  color: #fff;
}

.btn-dark:hover {
  background-color: #23272b;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}



</style>
