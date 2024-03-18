export const saveUserProfileFromLS = (userProfile)=> {
  console.log('Userabc:', userProfile);
    // Convert userProfile to JSON string
    const userProfileString = JSON.stringify(userProfile);
    
    // Save the userProfileString in localStorage with the user's ID as the key
    localStorage.setItem(`user`, userProfileString);
  }
  
  export const getUserProfileFromLS=()=> {
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

  export const saveTokenFromLS = (token)=> {
    // Save the token in localStorage
    localStorage.setItem('token', token);
  }

  export const getTokenFromLS = ()=> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    return token;
  }

  export const deleteTokenFromLS = ()=> {
    // Remove the token from localStorage
    localStorage.removeItem('token');
  }
  
