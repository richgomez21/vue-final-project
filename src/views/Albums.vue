<template>
  <div class="album-list">
      <button type="button" class="btn btn-dark" @click="$router.push({ name: 'AddAlbum' })">Add New Album</button>
      <br><br>
      <table align="center" class="table table-hover table-dark">
          <thead>
              <tr>
                  <th scope="col">Album</th>
                  <th scope="col">Album Name</th>
                  <th scope="col">Artist Name</th>
                  <th scope="col">Release Date</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="album in albums" :key="album.id">
                  <td>{{ album.id }}</td>
                  <td>{{ album.albumName }}</td>
                  <td>{{ album.artistName }}</td>
                  <td>{{ album.releaseDate }}</td>
                  <td>
                      <button type="button" class="btn btn-secondary" @click="editAlbum(album.id)">Edit</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { getAllAlbums} from "@/api";

export default {
  data() {
      return {
          albums: []
      };
  },
  mounted() {
      getAllAlbums().then((albums) => (this.albums = albums));
     
  },
  methods: {
      editAlbum(id) {
          this.$router.push({ name: 'AlbumDetails', params: { albumId: id } });
      },
  },
};
</script>

<style>
  /* Add your styles here if needed */
</style>
