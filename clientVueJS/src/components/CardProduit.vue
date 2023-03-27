<script>
export default {
    props: ['id', 'libelle'],
    data() 
    {
        return {
        };
    }
}
</script>

<template>
    <div class="Bien">
      <div>
        <p>{{ libelle }}</p>
      </div>
      <div>
        <p>{{ libelle }}</p>
      </div>
    </div>
</template>

<style>


  .Bien{
          background-color: #dddddd;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 25vw;
          height: 30vh;
  }

  .Bien:hover{
    cursor: pointer;
  }
</style>