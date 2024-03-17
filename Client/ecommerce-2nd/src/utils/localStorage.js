export const saveUserProfileFromLS = (id, userProfile)=> {
    // Convert userProfile to JSON string
    const userProfileString = JSON.stringify(userProfile);
    
    // Save the userProfileString in localStorage with the user's ID as the key
    localStorage.setItem(`user`, userProfileString);
  }
  
  export const getUserProfileFromLS=(id)=> {
    // Retrieve the userProfileString from localStorage using the user's ID
    const userProfileString = localStorage.getItem(`user`);
    
    // Parse the userProfileString back to JSON object
    const userProfile = JSON.parse(userProfileString);
    
    return userProfile;
  }

  export const deleteUserProfileFromLS = (id)=> {
    // Remove the userProfileString from localStorage using the user's ID
    localStorage.removeItem(`user`);
  }

  
