<template>
  <div style="width: 750px" class="info-list" data-type="正则" data-word="哈dsadsadadsdsadadsadsd哈哈哈">
    <div class="list-content">
      <table class="table">
        <thead>
          <tr>
            <th>应用名</th>
            <th>包名</th>
            <th>启动项</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, ii) in [1, 1, 1, 1, 1]" :key="ii">
            <td v-for="item in [1, 2, 3, 4]" :key="item">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-list {
  padding-top: 20px;
  position: relative;
  &::before {
    content: attr(data-type) '/' attr(data-word);
    font-size: 16px;
    height: 30px;
    padding: 2px 5px;
    border-radius: 2px;
    position: absolute;
    display: block;
    color: var(--color-white-text);
    background-color: var(--color-primary);
    transform: translate(10px, -10px);
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list-content {
    box-shadow: 1px 2px 5px var(--color-gray-shadow);
    padding: 10px 5px;
    padding-top: 30px;
    box-sizing: border-box;

    .table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;

      tbody {
        tr {
          transition: background-color 0.2s 0.05s;
          &:hover {
            background-color: var(--color-gray-lighter);
          }
        }
      }

      tr {
        th {
          text-align-last: left;
        }

        td {
          padding: 10px 0;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
