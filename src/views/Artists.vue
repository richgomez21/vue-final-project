<template>
  <div class="artist-list">
      <button type="button" class="btn btn-dark" @click="$router.push({ name: 'AddArtist' })">Add New Artist</button>
      <br><br>
      <table align="center" class="table table-hover table-dark">
          <thead>
              <tr>
                  <th scope="col">Artist</th>
                  <th scope="col">StageName</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Genre</th>
                  
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="artist in artists" :key="artist.id">
                  <td>{{ artist.id }}</td>
                  <td>{{ artist.stageName }}</td>
                  <td>{{ artist.firstName }}</td>
                  <td>{{ artist.lastName }}</td>
                  <td>{{artist.genre }}</td>
                
                  <td>
                      <button type="button" class="btn btn-secondary" @click="editArtist(artist.id)">Edit</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { getAllArtists} from "@/api";

export default {
  data() {
      return {
          artists: [],
      };
  },
  mounted() {
      getAllArtists().then((artists) => (this.artists = artists));
    //   getUserById().then((users) => (this.users = users));
  },
  methods: {
      editArtist(id) {
          this.$router.push({ name: 'ArtistDetails', params: { artistId: id } });
      },
  },
};
</script>

<style>
  /* Add your styles here if needed */
</style>
