<template>
    <div v-if="album">
      <form @submit.prevent="onSubmit" class="album-form">
        <div class="mb-3">
          <label for="albumName" class="form-label fw-bold">Album Name:</label>
          <input v-model="album.albumName" type="text" class="form-control" id="albumName" />
          <div class="validation">{{ errors.albumName }}</div>
        </div>
        <div class="mb-3">
          <label for="artistName" class="form-label fw-bold">Artist Name:</label>
          <input v-model="album.artistName" type="text" class="form-control" id="artistName" />
          <div class="validation">{{ errors.artistName }}</div>
        </div>
        <div class="mb-3">
          <label for="releaseDate" class="form-label fw-bold">Release Date:</label>
          <input v-model="album.releaseDate" type="text" class="form-control" id="releaseDate" />
          <div class="validation">{{ errors.releaseDate }}</div>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-dark">Save</button>
          <button type="button" @click="$router.push({ name: 'Albums' })" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </template>

<script>
import {getAlbumById, getAllRoles, updateAlbum, insertAlbum} from "@/api"

export default {
    props:["albumId"],
    data(){
        return{
            album:null,
            roles:[],
            errors:{}
        }
    },
    mounted(){

        if(this.$route.name != "AddAlbum" && isNaN(this.albumId)){
            this.$router.push({name:"NotFound"})
        }

        getAllRoles().then(roles => this.roles = roles);

        if(this.albumId > 0){
            getAlbumById(this.albumId).then(album => this.album = album).catch(err => this.$router.push({name:"NotFound"}));
        }else{
            // if the albumId prop was not passed in, then we are creating a new empty album
            this.album = {id:0, albumName:"", artistName:"", releaseDate:""};
        }
    },
    methods:{
        onSubmit() {
            if(this.isValid()){
                if(this.albumId > 0){
                    updateAlbum(this.album).then(resp => {
                        this.$router.push({name: 'Albums'});
                    });
                }else{
                    insertAlbum(this.album).then(resp => this.$router.push({name: 'Albums'}));
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

            if(this.album.albumName == ""){
                this.errors.albumName = "ENTER ALBUM NAME";
                valid = false;
            }

            if(this.album.artistName == ""){
                this.errors.artistName = "ENTER ARTIST NAME";
                valid = false;
            }

            if(this.album.releaseDate == ""){
                this.errors.releaseDate = "ENTER RELEASE DATE";
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

.album-form {
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
