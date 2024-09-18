export function validateMobileNumber(number: string): boolean {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
  
    // Check if the number matches the Indian mobile number pattern
    // Indian mobile numbers are 10 digits long and start with 6, 7, 8, or 9
    const indianMobilePattern = /^[6-9]\d{9}$/;
  
    return indianMobilePattern.test(cleanNumber);
  }