export async function notifyUser(notificationText = "Thank you user for enabling notification!") {
  if (!("Notification" in window)) {
    alert("Browser doesnot support notification");
  } else if (Notification.permission === "granted") {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== "denied") {
    await Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notificationText);
      }
    })
  }
}