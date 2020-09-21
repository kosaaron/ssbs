<?php

class EmailTemplates
{
    public function verification($userName, $baseUrl, $activationCode, $newPassword)
    {
        
        $mail_text = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="padding:0;margin:0;background-color:rgb(234, 234, 234);background-color:rgb(234, 234, 234);margin-top:0;">
  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body bgcolor="#EAEAEA" style="font-family:Helvetica, Arial, sans;color:rgb(34, 31, 31);padding:0;margin:0;background-color:rgb(234, 234, 234);background-color:rgb(234, 234, 234);margin-top:0;"> <!-- 100% Size Container -->

    <!-- Preview Text -->
    <div style="display:none;width:0;height:0;max-height:0;line-height:0;mso-hide:all;overflow:hidden;visibility:hidden;"></div>

    <!-- End Preview Text -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" id="container" style="background-color:rgb(234, 234, 234);margin-top:0;">
      <tbody>
        <tr>
          <td align="center"> <!-- Hero + Content -->
            <table width="600" cellpadding="0" cellspacing="0" border="0"> <!-- Content -->
              <tbody>
                <tr>
                  <td bgcolor="#1a1d40" style="background: rgb(26,29,64);">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">

                      <!-- Logo -->
                      <tbody>
                        <tr>
                          <td colspan="3" height="60"></td> 
                        </tr>
                        <!-- End Logo -->

                        <!-- Headline -->
                        <tr>
                          <td width="90"></td> 
                          <td  align="left" style="font-family:Helvetica, Arial, sans;font-weight:bold;font-size:32px;color:rgb(230, 230, 230);line-height:40px;"> Device Verification </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="25"></td> 
                        </tr>
                        <!-- End Headline -->

                        <!-- Copy -->
                        <tr>
                          <td width="90"></td> 
                          <td align="left" style="font-family:Helvetica Neue, Helvetica, Roboto, Segoe UI, sans-serif;font-size:18px;line-height:24px;-webkit-font-smoothing:antialiased;color:rgb(210, 210, 210);"> Hi '.$userName.', </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="25"></td> 
                        </tr>
                        <!-- End Copy -->

                        <!-- Copy -->
                        <tr>
                          <td width="90"></td> 
                          <td align="left" style="font-family:Helvetica Neue, Helvetica, Roboto, Segoe UI, sans-serif;font-size:18px;line-height:24px;-webkit-font-smoothing:antialiased;color:rgb(210, 210, 210);"> Please verify your device by clicking on the link below: </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="20"></td> 
                        </tr>
                        <tr>
                          <td width="90"></td> 
                          <td align="left" style="font-family:Helvetica Neue, Helvetica, Roboto, Segoe UI, sans-serif;font-size:18px;line-height:24px;-webkit-font-smoothing:antialiased;color:rgb(173, 173, 173);"> '.$baseUrl.'login.php?act_code='.$activationCode.'&new_pass='.$newPassword.' </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="20"></td>
                        <!-- End Copy -->

                        <!-- Spacer -->
                        <tr>
                          <td style="font-size:0;line-height:0;" height="0"> &nbsp; </td>
                        </tr>
                        <tr style="display:none;mso-hide:all;">
                          <td style="font-size:0;line-height:0;" height="0"> &nbsp; </td>
                        </tr>

                        <!-- End Spacer -->

                        <!-- Copy -->
                        <tr>
                          <td width="90"></td> 
                          <td align="left" style="font-family:Helvetica Neue, Helvetica, Roboto, Segoe UI, sans-serif;font-size:18px;line-height:24px;-webkit-font-smoothing:antialiased;color:rgba(210, 210, 210);"> We\'re here to help if you need it. Visit the <a href="https://help.netflix.com/support/264?lnktrk=EMP&amp;g=53115CC2FA62A78FDABCF691EED4EAAD64551352&amp;lkid=URL_HELP" style="color:inherit;font-family:Helvetica, Arial, sans;text-decoration:underline;color:inherit;">Help Center</a> for more info or <a href="https://help.netflix.com/contactus?lnktrk=EMP&amp;g=53115CC2FA62A78FDABCF691EED4EAAD64551352&amp;lkid=URL_CONTACT" style="color:inherit;font-family:Helvetica, Arial, sans;text-decoration:underline;color:inherit;">contact us</a>. </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="20"></td> 
                        </tr>
                        <!-- End Copy -->

                        <!-- Copy -->
                        <tr>
                          <td width="90"></td> 
                          <td align="left" style="font-family:Helvetica Neue, Helvetica, Roboto, Segoe UI, sans-serif;font-size:18px;line-height:24px;-webkit-font-smoothing:antialiased;color:rgb(210, 210, 210);"> Wishing you an efficient work! </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="20"></td> 
                        </tr>
                        <!-- End Copy -->

                        <!-- Copy -->
                        <tr>
                          <td width="90"></td> 
                          <td align="left" style="font-family:Helvetica Neue, Helvetica, Roboto, Segoe UI, sans-serif;font-size:18px;line-height:24px;-webkit-font-smoothing:antialiased;color:rgb(173, 173, 173);"> /SSB Systems/ </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="60"></td> 
                        </tr>
                        <!-- End Copy -->
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:rgb(34, 31, 31);"> <!-- Footer -->
              <tbody>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgb(34, 31, 31);"> <!--  Footer  -->
                      <tbody>
                        <tr>
                          <td colspan="3" height="24"></td> 
                        </tr>
                        <tr>
                          <td width="90"></td> 
                          <td style="background-color:rgb(34, 31, 31);font-family:Helvetica, Arial, sans;font-size:14px;color:rgb(169, 166, 166);line-height:16px;"> Questions? Call 1-866-579-7172 </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="12"></td> 
                        </tr>
                        <tr>
                          <td width="90"></td> 
                          <td style="background-color:rgb(34, 31, 31);font-family:Helvetica, Arial, sans;font-size:14px;color:rgb(169, 166, 166);line-height:16px;"> This account email has been sent to you as part of your SSBS membership. To change your email preferences at any time, please visit the <a style="color:#A9A6A6;color:rgb(169, 166, 166);text-decoration:underline;color:inherit;" href="#">Settings</a> page for your account. </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="12"></td> 
                        </tr>
                        <tr>
                          <td width="90"></td> 
                          <td style="background-color:rgb(34, 31, 31);font-family:Helvetica, Arial, sans;font-size:14px;color:rgb(169, 166, 166);line-height:16px;"> This message was mailed by SSBS. </td>
                          <td width="90"></td> 
                        </tr>
                        <tr>
                          <td colspan="3" height="24"></td> 
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Fix for Google Inbox -->
    <table cellpadding="0" cellspacing="0" border="0" width="600" height="1" align="center" style="width: 600px !important;">
      <tbody>
        <tr>
          <td> <img src="http://cdn.nflximg.com/us/email/spacer.gif" width="200" height="1" style="border-collapse:collapse;display:block;-ms-interpolation-mode:bicubic;border:none;outline:none;"> </td>
          <td> <img src="http://cdn.nflximg.com/us/email/spacer.gif" width="200" height="1" style="border-collapse:collapse;display:block;-ms-interpolation-mode:bicubic;border:none;outline:none;"> </td>
          <td> <img src="http://cdn.nflximg.com/us/email/spacer.gif" width="200" height="1" style="border-collapse:collapse;display:block;-ms-interpolation-mode:bicubic;border:none;outline:none;"> </td>
        </tr>
      </tbody>
    </table>

    <!-- Fix for Gmail on iOS -->
    <div style="white-space:nowrap; font:15px courier; line-height:0;">
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>
  </body>
</html>';
        
        
        
        
        return $mail_text;
    }
}