<template>
  <div class="scroll-table">
    <span class="fs14">单位:万元</span>
    <!-- 表头 -->
    <table class="mt5">
      <colgroup>
        <col name="dept" width="80" />
        <col name="table-row-cell_1" width="65" />
        <col name="table-row-cell_2" width="65" />
        <col name="table-row-cell_3" width="60" />
        <col name="table-row-cell_4" width="60" />
        <col name="table-row-cell_5" width="65" />
        <col name="w80" width="80" />
        <col name="w60" width="60" />
      </colgroup>
      <thead>
        <tr>
          <td class="dept">部门</td>
          <td class="table-row-cell_1">成衣库存</td>
          <td class="table-row-cell_2">面料库存</td>
          <td class="table-row-cell_3">理赔费</td>
          <td class="table-row-cell_4">延误费</td>
          <td class="table-row-cell_5">合计损失</td>
          <td class="pd0 w80">合计占销售比相较去年</td>
          <td class="pd0 w60">今年累计相较去年</td>
        </tr>
      </thead>
    </table>
    <!-- 表内容 -->
    <table
      class="table-content animate__animated"
      :class="{ animate__fadeInRight: showAnimate }"
    >
      <colgroup>
        <col name="dept" width="80" />
        <col name="table-row-cell_1" width="65" />
        <col name="table-row-cell_2" width="65" />
        <col name="table-row-cell_3" width="60" />
        <col name="table-row-cell_4" width="60" />
        <col name="table-row-cell_5" width="65" />
        <col name="w80" width="80" />
        <col name="w60" width="60" />
      </colgroup>
      <tbody :class="{ anim: animate }">
        <tr v-for="(item, i) in tableData" :key="i">
          <td class="dept">{{ item.name }}</td>
          <td class="table-row-cell_1">{{ item.garment_num }}</td>
          <td class="table-row-cell_2">{{ item.fabric_num }}</td>
          <td class="table-row-cell_3">{{ item.claims_num }}</td>
          <td class="table-row-cell_4">{{ item.delay_num }}</td>
          <td class="table-row-cell_5">{{ item.loss_num }}</td>
          <td
            class="pd0 w80"
            :class="item.sales_percentage.indexOf('-') > -1 ? 'green' : 'red'"
          >
            {{ item.sales_percentage }}
          </td>
          <td
            class="pd0 w60"
            :class="item.loss_percentage.indexOf('-') > -1 ? 'green' : 'red'"
          >
            {{ item.loss_percentage }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 表尾 -->
    <table>
      <colgroup>
        <col name="dept" width="80" />
        <col name="table-row-cell_1" width="65" />
        <col name="table-row-cell_2" width="65" />
        <col name="table-row-cell_3" width="60" />
        <col name="table-row-cell_4" width="60" />
        <col name="table-row-cell_5" width="65" />
        <col name="w80" width="80" />
        <col name="w60" width="60" />
      </colgroup>
      <tfoot>
        <tr class="total">
          <td class="dept">合计</td>
          <td class="table-row-cell_1">{{ totalData.garment_num }}</td>
          <td class="table-row-cell_2">{{ totalData.fabric_num }}</td>
          <td class="table-row-cell_3">{{ totalData.claims_num }}</td>
          <td class="table-row-cell_4">{{ totalData.delay_num }}</td>
          <td class="table-row-cell_5">{{ totalData.loss_num }}</td>
          <td
            class="pd0 w80"
            :class="
              totalData.sales_percentage.indexOf('-') > -1 ? 'green' : 'red'
            "
          >
            {{ totalData.sales_percentage }}
          </td>
          <td
            class="pd0 w60"
            :class="
              totalData.loss_percentage.indexOf('-') > -1 ? 'green' : 'red'
            "
          >
            {{ totalData.loss_percentage }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { business_cost } from '@/api/api';

export default {
  name: 'ScrollTable',
  data() {
    return {
      showAnimate: false, // 动画效果
      tableData: [],
      totalData: {
        sales_percentage: '',
        loss_percentage: '',
      },
      animate: false,
    };
  },
  methods: {
    // 获取费用公示
    getBusinessCost(page = 1) {
      this.showAnimate = false;
      const p = {
        page,
        per_page: 7,
      };
      business_cost(p).then(res => {
        if (res.status) {
          this.tableData = res.data.list;
          this.totalData = res.data.all_cost;
          const totalPage = Math.ceil(res.data.pagenations.total / 7);
          this.showAnimate = true;
          setTimeout(() => {
            if (totalPage <= page) {
              page = 0;
            }
            this.getBusinessCost(page + 1);
          }, 60 * 1000);
        }
      });
    },
    // scrollTable() {
    //   this.animate = true;
    //   setTimeout(() => {
    //     this.tableData.push(this.tableData[0]);
    //     this.tableData.shift();
    //     this.animate = false;
    //     this.scrollTable();
    //   }, 2000);
    // },
  },
  created() {
    this.getBusinessCost();
  },
};
</script>

<style lang="less" scoped>
.scroll-table {
  font-size: 14px;
  .table-content {
    display: block;
    height: 176px;
    overflow: scroll;
  }
  thead {
    text-align: center;
    color: #5d6b95;
    tr {
      height: 50px;
    }
    td {
      padding: 13px 3px 16px;
    }
  }
  .anim {
    transition: all 2s;
    margin-top: -25px;
  }
  tbody {
    text-align: center;
    height: 181px;
    padding-bottom: 45px;

    tr {
      display: table-row;
    }
    td {
      height: 25px;
    }
  }
  .total {
    text-align: center;
    color: rgba(207, 220, 255, 1);
    td {
      height: 45px;
      font-weight: 600;
    }
    .dept {
      font-weight: 400;
      color: rgba(207, 220, 255, 0.6);
    }
  }
  .dept {
    width: 80px;
  }
  .w80 {
    width: 80px;
  }
  .w60 {
    width: 60px;
  }
  .pd0 {
    padding: 0;
  }
  td {
    border-left: 1px dashed;
    border-right: 1px dashed;
    border-bottom: 1px solid;
    border-top: 1px solid;
    border-color: rgba(255, 255, 255, 0.1);
  }
  td:first-child {
    border-left: none;
  }
  td:last-child {
    border-right: none;
  }
  table {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
