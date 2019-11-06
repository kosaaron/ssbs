/**
 * Import CardContainer for CreatePlus function
 */
import CardContainer from './CardContainer.js';

/**
 * **Cards**
 */

let Cards = {
    Details: {
        vOCard: function (shellId) {
            let readyHTML = '';
            readyHTML += '<div class="row" id="' + shellId + '_*1*"><div class="card contactcard"><div class="card-body">';
            readyHTML += '!<div class="display-flex justify-content-between"><i class="fas fa-cube"></i>';
            readyHTML += '!<div class="partner-contact-main flex-1">';
            readyHTML += '!<h3 class="card-title contact-name">*2*</h3>';
            readyHTML += '!<p>*3*</p>';
            readyHTML += '!</div></div>';
            readyHTML += '!<div id="1" class="contact-container" style="">';
            readyHTML += '!<p class="contactdata"><i class="fab fa-buffer partnercard-logo"></i>*4*</p>';
            readyHTML += '!<p class="contactdata"><i class="fas fa-money-bill partnercard-logo"></i>*5*</p>';
            readyHTML += '!<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*6*</p>';
            readyHTML += '!<p class="contactdata"><i class="far fa-envelope partnercard-logo"></i>*7*</p>';
            readyHTML += '!</div></div></div></div>';
            return readyHTML;
        }
    }
}
export default Cards;