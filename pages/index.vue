<template>
  <div class="mt-5">
    <b-container>
      <b-row>
        <b-col md="8" offset-md="2">
          <shifts-shift-filter />
          <shifts-shift-list />
        </b-col>
      </b-row>
    </b-container>
    <shifts-shift-forms />
  </div>
</template>

<script>

export default {
  name: 'ShiftIndex',
}
</script>
