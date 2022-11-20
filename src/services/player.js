export default {
  playerDataContainsText(player, text){
    text = text.toLowerCase();
    if(player.firstName.toLowerCase().includes(text)) return true;
    if(player.lastName.toLowerCase().includes(text)) return true;
    if(`${player.shirtNumber}`.includes(text)) return true;
    return false;
  }
}