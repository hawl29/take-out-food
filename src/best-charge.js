var price_table=loadAllItems();
function convert(selectedItems) {
   var order_sheet=new Array();
   for(var i=0;i<selectedItems.length;i++)
   {
      var temp_item;
      var element=new Object();
      temp_item=selectedItems[i].substr(0,8);
      element.count=Number(selectedItems[i].substr(-1,1));
      for(var j=0;j<price_table.length;j++)
      {
         if(temp_item==price_table[j].id)
         {
           element.item=temp_item;
           element.name=price_table[j].name;
           element.price=price_table[j].price;
           break;
         }
      }
      order_sheet.push(element);
   }
   return order_sheet;
}
function compute(order_sheet1) {
  var output=new  Object();
  var promotion=loadPromotions();
  var sum1=0,sum2=0,temp_price;
  for(var i=0;i<order_sheet1.length;i++)
  {
     temp_price=order_sheet1[i].price*order_sheet1[i].count;
     sum1+=temp_price;
     for(var j=0;j<promotion[1].items.length;j++)
     {
       if(order_sheet1[i].item==promotion[1].items[j])
       {
         temp_price/=2;
       }
     }
     sum2+=temp_price;
  }
  if(sum1<30)
  {
    output.preferential_way='';
    output.total_price=sum1;
  }
  else if(sum1>sum2)
  {
    output.preferential_way='使用优惠<br><br>'+promotion[0].type + ','+'省6元<br><br>';
    output.preferential_way+='--------------------------------------------------------<br><br>';
    output.total_price=sum1-6;
  }
  else
  {
    output.preferential_way='使用优惠<br><br>'+promotion[1].type + '(黄焖鸡，凉皮)' +','+ '省' + sum1-sum2 + '元<br><br>';
    output.preferential_way+='--------------------------------------------------------<br><br>';
    output.total_price=sum2;
  }
  return output;
}
/*function print_order(output,order_sheet) {
  var temp,box;
  console.log('============= 订餐明细 =============\n');
  for(var i=0;i<order_sheet.length;i++)
  {
    temp=order_sheet[i].price*order_sheet[i].count;
    console.log(order_sheet[i].name+'x'+order_sheet[i].count+'='+temp+'元\n');
  }
  console.log('-----------------------------------\n');
  console.log('使用优惠\n');
  console.log(output.preferential_way);
  console.log('\n-----------------------------------\n');
  console.log('总计：'+output.total_price+'元\n');
  console.log('===================================');
  return box;
}*/
function print_order(output,order_sheet) {
  var temp,box;
  document.write('============= 订餐明细 =============<br><br>');
  for(var i=0;i<order_sheet.length;i++)
  {
    temp=order_sheet[i].price*order_sheet[i].count;
    document.write(order_sheet[i].name+'x'+order_sheet[i].count+'='+temp+'元<br><br>');
  }
  document.write('--------------------------------------------------------<br><br>');
  document.write(output.preferential_way);
  document.write('总计：'+output.total_price+'元<br><br>');
  document.write('===================================');
  document.write( "<br><br><br><br>");
}
function bestCharge(selectedItems) {

  var order_data=convert(selectedItems);
  var summary=compute(order_data);
  print_order(summary,order_data);
  return /*TODO*/;
}

