const getAdmins = () => {
  const admins = process.env.TELEGRAM_ADMINS || null;
  if (admins !== null) {
    return admins.split(',');
  }
  return [];
}

module.exports = {
  getAdmins
}