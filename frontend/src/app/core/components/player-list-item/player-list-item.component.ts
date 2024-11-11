import { Component, Input, OnInit } from '@angular/core';
import { Player } from '@/core/models';
import { getOverallGradientColor } from '@/core/utils';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-player-list-item',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss']
})
export class PlayerListItemComponent implements OnInit {
  @Input() player: Player|null = null;
  @Input() genre: string|null = null;
  overallColor: string|null = null

  ngOnInit() {
    this.overallColor = getOverallGradientColor(this.player!.overall)
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  }
}
