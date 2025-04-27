<script setup></script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th><h3>Indhold</h3></th>
          <th>DBI_icon_sort</th>
          <th>icon</th>
        </tr>
      </thead>
      <tbody>
        <tr class="rows">
          <td>Skemanavn</td>
          <td>...</td>
        </tr>
        <tr class="rows">
          <td>Førstehjælp</td>
          <td>...</td>
        </tr>
        <tr class="rows">
          <td>Skemanavn</td>
          <td>...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
thead {
  border-radius: 4px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
}

th {
  display: flex;
  align-items: center;
}

tr {
  display: flex;

  justify-content: space-between;
}

.rows {
  border-bottom: 1px solid #d5d5d5;
}

table {
  width: 100%;
  background-color: #fff;
  padding-bottom: 6px;
  border-radius: 4px;
  border: 1px solid #d5d5d5;
}
</style>
