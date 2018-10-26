function generateGuid() {
  return Math.floor((1 + Math.random()) * 0x10000).toString();
}

export default generateGuid;
