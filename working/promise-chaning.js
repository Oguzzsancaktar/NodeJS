const add = (a, b) => {
  
  return new Promise((resolve , rejected) => {
    setTimeout(() => {
      
      resolve(a + b)
    }, 2000);
  })
  
}


add(1, 2).then(sum => {
  
  console.log(sum);

  add(5 , sum).then(sum2 => {
    console.log(sum2);
  }).catch(e => {
    console.log(e);
  })
}).catch(e => {
  console.log(e);
})